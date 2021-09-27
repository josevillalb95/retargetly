module.exports = function(model) {
    const CsvServices={
        
        "findCsv": async ({sort,sortField,skip,limit}) => {
            limit=parseInt(limit)
            skip=parseInt(skip)
            sortObj={}
            sortObj[sortField]=(sort=="asc")?1:-1
            try {
                let resp =await model.searchCsv(limit,skip,sortObj)
                return resp
            } catch (error) {
                return []
            } 
        }
    }
    return CsvServices
}
