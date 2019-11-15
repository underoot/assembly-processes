import React, { Fragment } from 'react';

import { ListPanel } from 'processes/components/ListPanel';
import { useProcesses } from 'processes/hooks/processes';
import { Filter } from 'processes/components/Filter';
import { ProcessesList } from 'processes/components/List';

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
    processes,
    isLoading
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
        onIncrementPage={incrementPage}
        header={
          <ListPanel
            count={count}
            order={sortOrder}
            onChangeOrder={changeSortOrder}
            search={searchTerm}
            onChangeSearch={changeSearchTerm}
            onClearSearch={clearSearchTerm}
            isLoading={isLoading}
          />
        }
      />
    </Fragment>
  );
};
