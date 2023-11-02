const elasticSearch = require('elasticsearch');
const {joinedMapping } = require('../commonConstants/elasticConstants.js');

const client = elasticSearch.Client({
    host: 'localhost:9200',
    // log: 'trace'
});

const startElastic = ()=>{
    client.ping({
        requestTimeout: 30000
    },function(error){
        if (error) {
            console.log('Error in elastic client:',error);
            return;
        }
    
        console.log('Elastic is up and running!');
    });
}


const createIndex = async(indexName)=>{
    await client.indices.create({index: indexName}); 
    console.log("Created index!",indexName);
}

const checkIndex = async(indexName)=>{
    try{
        const indexExists = await client.indices.exists({
        index: indexName
        });
        return indexExists;
    }catch(error){
        console.log('Error checking index',error);
        return;
    }
}

const searchIndex = async(indexName,body)=>{
    const searchResults = await client.search({
        index: indexName,
        // doc: docName,
        body: body
    });

    return searchResults;
}

const addDocument = async(indexName,docType,body)=>{
    try {
        const indexExist = await checkIndex(indexName);
        if(!indexExist){
            await createIndex(indexName);
            await mapping(indexName,'_doc',joinedMapping);
        }
        const document = await client.index({
            index: indexName,
            // type: docType,
            // id: id,
            body: body
        });

        console.log("New document added to index",indexName);
    } catch (error) {
        console.log('Error in adding document',error);
        return;
    }
}

const updateDocument = async(indexName,id,docType,body)=>{
    try {
        const document = await client.update({
            index: indexName,
            type: docType,
            id: id,
            body: body
        });
    } catch (error) {
        console.log('Error in updating document',error);
    }
}

const deleteDocument = async(indexName,id,docType,body)=>{
    try {
        await client.delete({
            index: indexName,
            type: docType,
            id: id,
            body: body
        });
    } catch (error) {
        console.log('Error in deleting document',error);
    }
}

const mapping = async(indexName,docType,body)=>{
    try {
        await client.indices.putMapping({
            index: indexName,
            type: docType,
            body: body
        });
    } catch (error) {
        console.log('Error in mapping,',error);
    }
}

const bulkAdd = async(indexName,docType,body)=>{
    try {
        await client.bulk({
            index: indexName,
            docType: '_doc',
            body: body
        });
    } catch (error) {
        console.log('Error in bulk adding',error);
    }
}

module.exports = {startElastic,checkIndex,createIndex,searchIndex,addDocument,updateDocument,deleteDocument,mapping,bulkAdd};


