require('dotenv').config();
const mongoose = require('mongoose');
const Game = require('./models/Game');

const games = [
  {
    name: 'Elden Ring',
    genre: 'Action RPG',
    releaseYear: 2022,
    rating: 9.5,
    price: 59.99,
    publisher: 'Bandai Namco',
    developer: 'FromSoftware',

    description: [
      'Elden Ring là một tựa game hành động nhập vai thế giới mở được phát triển bởi FromSoftware và do Bandai Namco phát hành.',
      'Game diễn ra trong thế giới Lands Between rộng lớn, nơi người chơi vào vai Tarnished – một kẻ bị lưu đày trở lại để tìm kiếm sức mạnh của Elden Ring.',
      'Trò chơi kết hợp lối chơi chiến đấu đặc trưng của dòng Souls-like với thế giới mở tự do.',
      'Người chơi có thể tự do khám phá, chiến đấu với boss và phát triển nhân vật theo nhiều hướng khác nhau.',
      'Elden Ring được đánh giá là một trong những game hay nhất mọi thời đại.'
    ],

    platforms: ['PC', 'PS5', 'Xbox'],

    imageUrl:
      'https://res.cloudinary.com/ipc-media/image/upload/v1776438766/j1zlj9epgufdvdzpyndt.avif',

    tags: ['Souls-like', 'Open World', 'Fantasy', 'Hardcore'],

    systemRequirements: {
      minimum: 'Intel i5, 8GB RAM, GTX 1060',
      recommended: 'Intel i7, 16GB RAM, RTX 3060',
    },

    trailerUrl: 'https://youtu.be/E3Huy2cdih0?si=JcP2Quv0-vI1Q-Qh',
  },

  {
    name: 'The Witcher 3',
    genre: 'RPG',
    releaseYear: 2015,
    rating: 9.8,
    price: 39.99,
    publisher: 'CD Projekt',
    developer: 'CD Projekt Red',

    description: [
      'The Witcher 3 là game nhập vai thế giới mở với bối cảnh u tối và chiến tranh phức tạp.',
      'Người chơi vào vai Geralt of Rivia – thợ săn quái vật chuyên nghiệp.',
      'Mỗi lựa chọn trong game đều ảnh hưởng đến cốt truyện và thế giới.',
      'Game có hàng trăm giờ nội dung phụ và nhiều kết thúc khác nhau.'
    ],

    platforms: ['PC', 'PS4', 'Switch'],

    imageUrl:
      'https://res.cloudinary.com/ipc-media/image/upload/v1776438766/mzyypagdcv0wxbxnhcjq.jpg',

    tags: ['RPG', 'Story Rich', 'Open World', 'Fantasy'],

    systemRequirements: {
      minimum: 'Intel i5, 6GB RAM, GTX 770',
      recommended: 'Intel i7, 16GB RAM, GTX 1060',
    },

    trailerUrl: 'https://youtu.be/c0i88t0Kacs?si=DR7_6kC9mnBNM8Q5',
  },

  {
    name: 'Hollow Knight',
    genre: 'Metroidvania',
    releaseYear: 2017,
    rating: 9.0,
    price: 14.99,
    publisher: 'Team Cherry',
    developer: 'Team Cherry',

    description: [
      'Hollow Knight là game 2D Metroidvania lấy bối cảnh vương quốc Hallownest.',
      'Người chơi khám phá thế giới rộng lớn và chiến đấu với sinh vật kỳ lạ.',
      'Game nổi bật với đồ họa vẽ tay và âm nhạc trầm buồn.',
      'Mỗi khu vực có thiết kế riêng biệt và boss đặc trưng.'
    ],

    platforms: ['PC', 'Switch'],

    imageUrl:
      'https://res.cloudinary.com/ipc-media/image/upload/v1776438765/vfwir4nbwsefjf6gzubf.avif',

    tags: ['Indie', 'Metroidvania', '2D', 'Souls-like'],

    systemRequirements: {
      minimum: 'Intel i3, 4GB RAM',
      recommended: 'Intel i5, 8GB RAM',
    },

    trailerUrl: 'https://youtu.be/Y2amTl5lBYM?si=a-jF9yVzZ-oZA9l-',
  },

  {
    name: 'Honkai: Star Rail',
    genre: 'Turn-based RPG',
    releaseYear: 2023,
    rating: 9.2,
    price: 0,
    publisher: 'HoYoverse',
    developer: 'HoYoverse',

    description: [
      'Honkai: Star Rail là game nhập vai theo lượt với phong cách anime.',
      'Người chơi du hành qua nhiều hành tinh trên Astral Express.',
      'Game có hệ thống chiến đấu chiến thuật theo lượt hiện đại.',
      'Mỗi nhân vật có kỹ năng riêng, yêu cầu xây dựng đội hình hợp lý.',
      'Game nổi bật với đồ họa anime và cốt truyện đa hành tinh.'
    ],

    platforms: ['PC', 'PS5', 'Mobile'],

    imageUrl:
      'https://res.cloudinary.com/ipc-media/image/upload/v1777383866/ccuobnrrrwlnzlgv8sqs.jpg',

    tags: ['Turn-based', 'Anime', 'Sci-fi', 'Gacha'],

    systemRequirements: {
      minimum: 'Intel i5, 8GB RAM, GTX 750',
      recommended: 'Intel i7, 16GB RAM, GTX 1060',
    },

    trailerUrl: 'https://youtu.be/jCxq-jMMsAc?si=fx4bbXhkuqqHibxm',
  },
  {
    name: 'Resident Evil: Requiem',
    genre: 'Survival Horror',
    releaseYear: 2025,
    rating: 9.0,
    price: 59.99,
    publisher: 'Capcom',
    developer: 'Capcom',

    description: [
      'Resident Evil: Requiem là một tựa game survival horror giả tưởng, tiếp nối bầu không khí u ám và căng thẳng đặc trưng của series Resident Evil.',
      'Người chơi bước vào một thế giới hậu thảm họa sinh học, nơi các thí nghiệm thất bại đã biến con người thành những sinh vật đáng sợ.',
      'Game tập trung vào yếu tố sinh tồn, quản lý tài nguyên và giải đố trong môi trường tối tăm và nguy hiểm.',
      'Với đồ họa hiện đại và thiết kế âm thanh rùng rợn, trò chơi mang lại trải nghiệm kinh dị chân thực và ám ảnh.'
    ],

    platforms: ['PC', 'PS5', 'Xbox'],

    imageUrl: 'https://res.cloudinary.com/ipc-media/image/upload/v1777403516/kl5qetsi9tjfll4b1enp.jpg',

    tags: ['Horror', 'Survival', 'Dark', 'Story Rich'],

    systemRequirements: {
      minimum: 'Intel i5, 8GB RAM, GTX 1060',
      recommended: 'Intel i7, 16GB RAM, RTX 3060',
    },

    trailerUrl: 'https://youtu.be/POz1-EmLsTY?si=dJCyGEp0nfEKsYUO'
  },
  {
    name: 'Pragmata',
    genre: 'Sci-fi Action-Adventure',
    releaseYear: 2026,
    rating: 9.1,
    price: 59.99,
    publisher: 'Capcom',
    developer: 'Capcom',

    description: [
      'Pragmata là một tựa game hành động phiêu lưu khoa học viễn tưởng được phát triển bởi Capcom, lấy bối cảnh trong tương lai gần trên một trạm nghiên cứu trên Mặt Trăng.',
      'Người chơi vào vai Hugh – một phi hành gia – cùng với Diana, một cô bé android bí ẩn, trong hành trình sinh tồn và tìm cách trở về Trái Đất.',
      'Gameplay kết hợp giữa bắn súng góc nhìn thứ ba và cơ chế hacking độc đáo, yêu cầu người chơi vừa chiến đấu vừa giải đố trong thời gian thực.',
      'Game nổi bật với cốt truyện cảm xúc xoay quanh mối quan hệ giữa con người và AI, cùng bầu không khí sci-fi cô lập và bí ẩn.',
      'Pragmata được đánh giá cao nhờ ý tưởng sáng tạo, đồ họa sử dụng RE Engine và trải nghiệm gameplay mới lạ trong dòng game hành động.'
    ],

    platforms: ['PC', 'PS5', 'Xbox Series X/S', 'Switch 2'],

    imageUrl:
      'https://res.cloudinary.com/ipc-media/image/upload/v1777403620/iqgo2n6gact7xgrioqp3.png',

    tags: ['Sci-fi', 'Action', 'Adventure', 'AI', 'Story Rich'],

    systemRequirements: {
      minimum: 'Intel i5, 8GB RAM, GTX 1060',
      recommended: 'Intel i7, 16GB RAM, RTX 3060',
    },

    trailerUrl: 'https://youtu.be/oncaa_fMsyw?si=BZx3B6uuX-mOwi8e',
  },
];

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    // Check DB for existing data
    const count = await Game.countDocuments();

    if (count > 0) {
      console.log('Data already exists, skipping seed...');
      await mongoose.connection.close();
      process.exit(0);
    }

    await Game.insertMany(games);

    console.log('Seeded successfully!');
    await mongoose.connection.close();
    process.exit(0);
  })
  .catch((err) => {
    console.error('Seeding error:', err);
    process.exit(1);
  });