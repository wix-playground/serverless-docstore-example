const COLLECTION_NAME = 'some-collection'

module.exports = (functionsBuilder) =>
  functionsBuilder
  .withNamespace('docstore-example')
  .addWebFunction('GET', '/resources/:id', (ctx, req) => {
    return ctx.docstore.get(COLLECTION_NAME, req.params.id);
  })
  .addWebFunction('POST', '/resources', (ctx, req) => {
    const {id} = req.body;
    return ctx.docstore.insert(COLLECTION_NAME, {_id: id});
  })
  .addWebFunction('GET', '/isalive', () => {
    return 'Alive';
  });