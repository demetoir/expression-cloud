const node_env = process.env.NODE_ENV || 'dev';

// use sqlite in test mode and use mysql in dev and prod
// but in sqlite auto increment option can only apply at integer type
// so use integer type at table id type, if test mode
let tableIdType;
if (node_env ==='test'){
	tableIdType=  'integer'
}else{
	tableIdType = 'bigint'
}



export default tableIdType;
