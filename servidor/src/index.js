
 const express = require ("express");
 const cors = require("cors");
 const server = express();

 server.use(express.json());
 server.use(cors());

 const ProdutoRoutes = require('./routes/ProdutoRoutes');
 const VendaRoutes = require('./routes/VendaRoutes');
 const UsuarioRoutes = require('./routes/UsuarioRoutes');
 
 server.use('/produto', ProdutoRoutes);
 server.use('/venda', VendaRoutes)
 server.use('/usuario', UsuarioRoutes)

 server.listen(10101,()=>{
     console.log('servidor online');
 });

