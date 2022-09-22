
// 科创知识中心
// function sleep(time) {
//   return new Promise(resolve => {
//     setTimeout(resolve, time);
//   });
// }
// export default {
//   'POST /api/upload': async (req, res) => {
//     await sleep(2000);
//     res.send({
//       header: { code: 400, message: 'vv' },
//       body: 'jweorjowe',
//     });
//   },

// 政策通
export default {
  'POST /upload/images': (req, res) => {
    res.send({
      header: { code: 200 },
      body: {
        name: 'xxx.png',
        status: 'done',
        url: 'https://sdf',
      },
    });
  },
};
