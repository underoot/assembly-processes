const fs = require('fs');
const { promisify } = require('util');
const server = require('json-server');
const router = server.router('src/server/data.json');
const middlewares = server.defaults();

const getTime = dt => new Date(dt.replace(' ', '')).getTime();
const readFileAsync = promisify(fs.readFile);

module.exports = app => {
  app
    /**
     * @note Поскольку JSON-Server не предоставляет кастомную сортировку —
     * Пишем кастомный роут со схожей логикой и с правильной сортировкой.
     *
     * @todo Написать в библиотеку `json-server` запрос на функциональность
     * кастомной сортировки
     */
    .get('/api/processes', middlewares, async (req, res) => {
      const buf = await readFileAsync('src/server/data.json');
      const db = JSON.parse(buf.toString());

      const {
        q = '',
        _order = 'asc',
        _page = 0,
        _limit = 30,
        ...otherProps
      } = req.query;

      const [page, limit] = [_page, _limit].map(num => parseInt(num, 10));

      const [count, processes] = db.processes
        .sort(({ updated: u1 }, { updated: u2 }) => {
          if (_order === 'asc') {
            [u1, u2] = [u2, u1];
          }

          return getTime(u1) - getTime(u2);
        })
        .filter(process =>
          new RegExp(q.toLowerCase(), 'g').test(process.title.toLowerCase())
        )
        .filter(process =>
          Object.keys(otherProps).every(
            key =>
              !Boolean(otherProps[key]) ||
              process[key].toLowerCase() === otherProps[key].toLowerCase()
          )
        )
        .reduce(
          ([total, processes], process) => [++total, [...processes, process]],
          [0, []]
        );

      res.jsonp({
        count,
        items: processes.slice(page * limit, page * limit + limit)
      });
    })
    .use('/api', middlewares, router);

  return app;
};
