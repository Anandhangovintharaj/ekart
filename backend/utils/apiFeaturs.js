const { match } = require("assert");
const { json } = require("stream/consumers");

class APIFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    search() {
        let keyword = this.queryStr.keyword ? {
            name: {
                $regex: this.queryStr.keyword, // Corrected this line
                $options: 'i'
            }
        } : {};
        this.query.find({ ...keyword });
        return this;
    }
    filter() {
        const queryCopy = { ...this.queryStr };
       
        // Exclude fields that should not be used for filtering
        const excludedFields = ['keyword', 'page', 'limit', 'sort'];
        excludedFields.forEach((field) => delete queryCopy[field]);
      
        let queryString = JSON.stringify(queryCopy);
        queryString = queryString.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`);
      
        // Convert the modified JSON string back to an object
        const parsedQuery = JSON.parse(queryString);
  
        this.query = this.query.find(parsedQuery);
        return this;
      }
      pagenate(resperpage){
        const currentPage = Number(this.queryStr.page) || 1;
                console.log(currentPage);
                const skipCount = (currentPage - 1) * resperpage;
               
                this.query.limit(resperpage).skip(skipCount);
                return this;
      }
      
}

module.exports = APIFeatures;
