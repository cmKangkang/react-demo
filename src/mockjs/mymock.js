import Mock from 'mockjs';
import abbr from '../properties/abbr';

Mock.mock("/test", {
    'code': 0,
    'data': {
        'list|1-10': [{
            // 属性 id 是一个自增数，起始值为 1，每次增 1
            'id|+1': 1,
            'title': '前端人人@id',
            'status': 1
        }]
    },
    'message': '操作成功',
    'systemDate': new Date().getTime()
});

Mock.mock("/test/rt",{
    'data|1-10':[{
        'load|0-10':0,
        'fwt|0-5.1-3':1.112,
        'fp|0-5.1-3':1.002,
        'mgp|0-5.1-3':1.02,
        'mgt|90-200.1-3':100,
        'mgf|0-100.1-3':50.01,
        'wc|0-100.1-3':10.001,
        'oh|0-100':50,
        '1stp|1-50':25,
        'tc|5000-10000':5000,
        'time':new Date().getTime(),
    }]
});

Mock.mock("/test/rt1",
    [{
        'name':'负载',
        'val|1':[100,105,107,109,500,400,654,90,356,893,278,566],
        'crt|1':[100,105,107,109,500,400,654,90,356,893,278,566],
        'avg|1':[100,105,107,109,500,400,654,90,356,893,278,566],
        'time':new Date().getDate(),
    },
    {
        'name':'e2',
        'val|1':[100,105,107,109,500,400,654,90,356,893,278,566],
        'crt|1':[100,105,107,109,500,400,654,90,356,893,278,566],
        'avg|1':[100,105,107,109,500,400,654,90,356,893,278,566],
        'time':new Date().getDate(),
    },
    {
        'name':'e3',
        'val|1':[100,105,107,109,500,400,654,90,356,893,278,566],
        'crt|1':[100,105,107,109,500,400,654,90,356,893,278,566],
        'avg|1':[100,105,107,109,500,400,654,90,356,893,278,566],
        'time':new Date().getDate(),
    },
    {
        'name':'e4',
        'val|1':[100,105,107,109,500,400,654,90,356,893,278,566],
        'crt|1':[100,105,107,109,500,400,654,90,356,893,278,566],
        'avg|1':[100,105,107,109,500,400,654,90,356,893,278,566],
        'time':new Date().getDate(),
    },
    {
        'name':'e5',
        'val|1':[100,105,107,109,500,400,654,90,356,893,278,566],
        'crt|1':[100,105,107,109,500,400,654,90,356,893,278,566],
        'avg|1':[100,105,107,109,500,400,654,90,356,893,278,566],
        'time':new Date().getDate(),
    },
    {
        'name':'e6',
        'val|1':[100,105,107,109,500,400,654,90,356,893,278,566],
        'crt|1':[100,105,107,109,500,400,654,90,356,893,278,566],
        'avg|1':[100,105,107,109,500,400,654,90,356,893,278,566],
        'time':new Date().getDate(),
    },
    {
        'name':'e7',
        'val|1':[100,105,107,109,500,400,654,90,356,893,278,566],
        'crt|1':[100,105,107,109,500,400,654,90,356,893,278,566],
        'avg|1':[100,105,107,109,500,400,654,90,356,893,278,566],
        'time':new Date().getDate(),
    },
    {
        'name':'e8',
        'val|1':[100,105,107,109,500,400,654,90,356,893,278,566],
        'crt|1':[100,105,107,109,500,400,654,90,356,893,278,566],
        'avg|1':[100,105,107,109,500,400,654,90,356,893,278,566],
        'time':new Date().getDate(),
    }]
);


let Random=Mock.Random;
Random.datetime('yyyy/mm/dd hh:mm:ss');
Random.integer(10,50);

// Mock.mock("/test/ht",'post',(option)=>{
//     console.log(option);
//     return{
//     'data|100':[{
//         'time':new Date().getTime(),
//         'val':Math.random()*100,
//     }]
// }
// })

Mock.mock("/test/ht1",'post',{
    'data|100':[{
        'time':'@datetime',
        'val':'@integer',
    }]
});

Mock.mock("/ht/diy",'post',{
    'data|100':[{
        'time':'@datetime',
        'val':'@integer',
    }]
});