---
id: paginated-queries
title: Paginated / Lagged Queries
---

Rendering paginated data is a very common UI pattern and in Vu Query, it "just works" by including the page information in the query key:

```js
const result = useQuery(['projects', page], fetchProjects)
```

However, if you run this simple example, you might notice something strange:

**The UI jumps in and out of the `success` and `loading` states because each new page is treated like a brand new query.**

This experience is not optimal and unfortunately is how many tools today insist on working. But not Vu Query! As you may have guessed, Vu Query comes with an awesome featured called `keepPreviousData` that allows us to get around this.

## Better Paginated Queries with `keepPreviousData`

Consider the following example where we would ideally want to increment a pageIndex (or cursor) for a query. If we were to use `useQuery`, **it would still technically work fine**, but the UI would jump in and out of the `success` and `loading` states as different queries are created and destroyed for each page or cursor. By setting `keepPreviousData` to `true` we get a few new things:

- **The data from the last successful fetch available while new data is being requested, even though the query key has changed**.
- When the new data arrives, the previous `data` is seamlessly swapped to show the new data.
- `isPreviousData` is made available to know what data the query is currently providing you

```js
function Todos() {
  const page = ref(0)

  const fetchProjects = (page = 0) => fetch('/api/projects?page=' + page)

  const query = useQuery(
    ['projects', reactive({ page })],
    () => fetchProjects(page.value),
    { keepPreviousData: true }
  )

  return () => {
    return (
      <div>
        {query.isLoading ? (
          <div>Loading...</div>
        ) : query.sError ? (
          <div>Error: {query.error.message}</div>
        ) : (
          <div>
            {query.data.projects.map(project => (
              <p key={project.id}>{project.name}</p>
            ))}
          </div>
        )}
        <span>Current Page: {page.value + 1}</span>
        <button
          onClick={(page.value = Math.max(page.value - 1, 0))}
          disabled={page.value === 0}
        >
          Previous Page
        </button>{' '}
        <button
          onClick={() => {
            if (!query.isPreviousData && query.data.hasMore) {
              page.value = page.value + 1
            }
          }}
          // Disable the Next Page button until we know a next page is available
          disabled={query.isPreviousData || !query.data.hasMore}
        >
          Next Page
        </button>
        {query.isFetching ? <span> Loading...</span> : null}{' '}
      </div>
    )
  }
}
```

## Lagging Infinite Query results with `keepPreviousData`

While not as common, the `keepPreviousData` option also works flawlessly with the `useInfiniteQuery` hook, so you can seamlessly allow your users to continue to see cached data while infinite query keys change over time.
