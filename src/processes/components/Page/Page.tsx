import React, { Fragment } from 'react';

import { ListPanel } from 'processes/components/ListPanel';
import { useProcesses } from 'processes/hooks/processes';
import { Filter } from 'processes/components/Filter';
import { ProcessesList } from 'processes/components/List';

/**
 * @todo Добавить синхронизацию с URL
 */
export const Page = () => {
  const {
    assemblyStatus,
    reviewStatus,
    searchTerm,
    sortOrder,
    changeAssemblyStatus,
    changeReviewStatus,
    changeSearchTerm,
    changeSortOrder,
    incrementPage,
    deleteProcess,
    changeTitle,
    clearSearchTerm,

    count,
    processes
  } = useProcesses();

  return (
    <Fragment>
      <Filter
        assemblyStatus={assemblyStatus}
        onChangeAssemblyStatus={changeAssemblyStatus}
        reviewStatus={reviewStatus}
        onChangeReviewStatus={changeReviewStatus}
      />
      <ProcessesList
        processes={processes}
        onDelete={deleteProcess}
        onChangeTitle={changeTitle}
        onScrollToEnd={incrementPage}
        header={
          <ListPanel
            count={count}
            order={sortOrder}
            onChangeOrder={changeSortOrder}
            search={searchTerm}
            onChangeSearch={changeSearchTerm}
            onClearSearch={clearSearchTerm}
          />
        }
      />
    </Fragment>
  );
};
