'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
// options.tableName = 'ReviewImages';

module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'ReviewImages';
    return queryInterface.bulkInsert(options,
      [
        {
          reviewId: 1,
          url: 'https://archello.s3.eu-central-1.amazonaws.com/images/2018/03/31/American-style-house-interior-design-in-Dammam-2.1522524114.1883.jpg'
        },
        {
          reviewId: 1,
          url: 'https://www.hawaiiliving.com/blog/wp-content/uploads/2019/12/1-Goldcoast-lounge.jpg'
        },
        {
          reviewId: 1,
          url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRItSF1jl2wcR9L0EbQ5z_7fYTmHqO9VXQfe8pQLp3tX7oX8RiC1DLN0kc95LICczT8fyM&usqp=CAU'
        },
        {
          reviewId: 1,
          url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3yQzcCnMqbzjnuDoQRQQwgfkFEHpdUWCLPdWUtoTwpb774SzKrLO5yV4K8j-9Gw0OEys&usqp=CAU'
        },
        {
          reviewId: 1,
          url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0dJEQAR1KFPK4sxMXfoMv35Er1m_hCvzOqTdWrECK_Gmy32Bi7ElN7LiKmHMjvf-L89M&usqp=CAU'
        },
        {
          reviewId: 2,
          url: 'https://i.pinimg.com/originals/9a/28/6f/9a286f1b388c258087a1140bbdbe499a.jpg'
        },
        {
          reviewId: 2,
          url: 'https://ssl.cdn-redfin.com/photo/90/bigphoto/192/14062192_0.jpg'
        },
        {
          reviewId: 2,
          url: 'https://ap.rdcpix.com/72eb6e3e64dfc582d5c4e47b023368f9l-m510687861od-w1024_h768_x2.jpg'
        },
        {
          reviewId: 2,
          url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZYc5eLqnEkOURKKeK1KgZp5_TDPHgZsGvOwaAh1LbKjAZyW4CNsttOEeBWfJ1bhkSuDo&usqp=CAU'
        },
        {
          reviewId: 2,
          url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScxbOPOIwqXJedwv5k9jd4JxnU2YG4NlFrhQ&usqp=CAU'
        },
        {
          reviewId: 2,
          url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqHYX5SV8QddX1AxDfTS-xQQyIu77tAy_DVw&usqp=CAU'
        },
        {
          reviewId: 3,
          url: 'https://livinginatiny.com/wp-content/uploads/2021/02/Tiny-house-with-amazing-interior-design_3.jpeg'
        },
        {
          reviewId: 3,
          url: 'https://mediavault.point2.com/p2h/listing/898c/abf2/b1c0/21d4bb8dd62a549132ea/nwm_large.jpg'
        },
        {
          reviewId: 3,
          url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4f9YHXLUkhtiHb_irRFaSK8LZWhGIlK6snasJOqAdB9beonaMlf-o9FmmgDrawx0qdR4&usqp=CAU'
        },
        {
          reviewId: 3,
          url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-z0XSr3DH5bk1mPibXMUKuTQZ_fDLOIGwGe8rdY63TX24HqMkoln6zDl05eBTYszktC8&usqp=CAU'
        },
        {
          reviewId: 3,
          url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHdhF5ruhbIRZG6MbnggHBo_VnW8dB-Wg3z6cQhZaLSyt3Jx_MPU5KqopMNw4Wjz1CSrU&usqp=CAU'
        },
        {
          reviewId: 3,
          url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlf221YuD22HPOtpiW6zrEV37e4QwDovc4spLHsprU2dPdN9favt-JvItCNAk2aWiMVG4&usqp=CAU'
        },
      ], {});
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'ReviewImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      id: {
        [Op.in]: [1, 2, 3]
      },
    }, {});
  }
};
