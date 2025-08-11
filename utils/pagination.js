
function pagedResponse({ count, rows }, page, pageSize) {
  const totalItems = count;
  const currentPage = page;
  const perPage = pageSize;
  const totalPages = Math.ceil(totalItems / perPage);

  return {
    success: true,
    body: {
      totalItems,
      totalPages,
      currentPage,
      perPage,
      items: rows,
    },
  };
}

module.exports = { pagedResponse };
