npx sequelize-cli model:generate --name User --attributes email:string,password:string,role:string

npx sequelize-cli model:generate --name Category --attributes name:string

npx sequelize-cli model:generate --name Profile --attributes firstName:string,lastName:string,address:string,gender:string,IdUser:integer

npx sequelize-cli model:generate --name Product --attributes name:string,totalSales:integer,size:string,color:string,stock:integer,price:integer,imgUrl:string,description:string,IdCategory:integer,IdUser:integer

npx sequelize-cli model:generate --name Cart --attributes IdProfile:integer

npx sequelize-cli model:generate --name ProductsHasCart --attributes IdProduct:integer,IdCart:integer

