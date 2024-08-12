class ApiFeatures{
    constructor(query,queryString)
{
    this.query=query;
    this.queryString=queryString
}

filter(){
    const queryObj={...this.queryString}
    const excludeFields=["page","sort","limit",'fields',"search"]
    excludeFields.forEach(el=>delete queryObj[el])
    let queryStr=JSON.stringify(queryObj)
    queryStr=queryStr.replace(/\b(gte|gt|lte|lt)\b/g,(match)=> `$${match}`)
    this.query.find(JSON.parse(queryStr))
    return this
}
sort(){
    if(this.queryString.sort){
        const sortBy=this.queryString.sort.split(',').join(' ')
        this.query=this.query.sort(sortBy)
    }else{
        this.query=this.query.sort("-created_at")
    }
    return this
}
limitFields(){
    if(this.queryString.fields){
        const fields=this.queryString.fields.split(',').join(' ')
        this.query=this.query.select(fields)
    }
    else{
        this.query=this.query.select('-__v')
    }
    return this
}
pagination(){
    const page=this.queryString.page*1||1;
    const limit=this.queryString.limit*1;
    const skip=(page-1)*limit
    this.query=this.query.skip(skip).limit(limit)
    return this
}
search (){
if(this.queryString.search){
 this.query.find({
      $or: [
        { name: new RegExp(this.queryString.search, 'i') },
        { description: new RegExp(this.queryString.search, 'i') },
        { ingredients: new RegExp(this.queryString.search, 'i') },
      ],
    });}else{}
    return this
 
};
searchOrders (){
if(this.queryString.search){
 this.query.find({
    $or:[
         {$expr: {
    $regexMatch: {
      input: { $toString: "$uniqueNumber" },
      regex: `${this.queryString.search}`    }
       
    }},
    { status: new RegExp(this.queryString.search, 'i') },
    {$expr: {
    $regexMatch: {
      input: { $toString: "$phone" },
      regex: `${this.queryString.search}`    }
       
    }},
    ]
});}else{}
    return this
 
};

searchUsers (){
    if(this.queryString.search){
 this.query.find({
      $or: [
        { name: new RegExp(this.queryString.search, 'i') },
        { email: new RegExp(this.queryString.search, 'i') },
        
      ],
    });}else{}
    return this
}
}
module.exports=ApiFeatures