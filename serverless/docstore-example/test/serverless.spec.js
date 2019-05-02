const {expect} = require('chai')
const {app} = require('@wix/serverless-testkit')
const axios = require('axios')
const {v4} = require('uuid')

describe('serverless-docstore-example',  () => {
  const testkit  = app('docstore-example').beforeAndAfter(30000);
    beforeEach(() => {
      testkit.docstore.clear();
    });

    it('should be alive', async () => {
      const serverlessUrl = testkit.getUrl(`/serverless/docstore-example/isalive`);
      const res = await axios.get(serverlessUrl);

      expect(res.data).to.eql('Alive');
    });

    it('should get item from docstore', async () => {
      const expectedId = v4();
      await testkit.docstore.loadItems('some-collection', [{_id: expectedId}]);

      const serverlessUrl = testkit.getUrl(`/serverless/docstore-example/resources/${expectedId}`);
      const res = await axios.get(serverlessUrl, {headers: testkit.defaultHeaders});

      expect(res.data._id).to.eql(expectedId);
    });
});
