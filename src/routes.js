const { addbookhandler, getbookhandler, getbookidhandler, editbookidhandler, deletebookidhandler } = require('./handler');

const routes = [{
  method: 'POST',
  path: '/books',
  handler: addbookhandler
},
{
  method: 'GET',
  path: '/books',
  handler: getbookhandler,
},
{
  method: 'GET',
  path: '/books/{bookId}',
  handler: getbookidhandler,
},
{
  method: 'PUT',
  path: '/books/{bookId}',
  handler: editbookidhandler
},
{
  method: 'DELETE',
  path: '/books/{bookId}',
  handler: deletebookidhandler
}

];

module.exports = routes;