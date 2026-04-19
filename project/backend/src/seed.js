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

    description:
      `Elden Ring là một tựa game hành động nhập vai thế giới mở được phát triển bởi FromSoftware và do Bandai Namco phát hành.
      Game diễn ra trong thế giới Lands Between rộng lớn, nơi người chơi vào vai Tarnished – một kẻ bị lưu đày trở lại để tìm kiếm sức mạnh của Elden Ring.

      Trò chơi kết hợp lối chơi chiến đấu đặc trưng của dòng Souls-like với thế giới mở tự do chưa từng có trước đây của FromSoftware.
      Người chơi có thể tự do khám phá các vùng đất, hầm ngục, lâu đài và đối đầu với hàng loạt boss mang tính biểu tượng với độ khó cao.

      Điểm đặc biệt của Elden Ring nằm ở sự tự do xây dựng nhân vật, hệ thống phép thuật đa dạng, và cốt truyện được kể thông qua môi trường thay vì tuyến tính.
      Đây là một trong những tựa game được đánh giá cao nhất mọi thời đại nhờ sự kết hợp hoàn hảo giữa gameplay thử thách và thế giới giả tưởng sâu sắc.`,

    platforms: ['PC', 'PS5', 'Xbox'],

    imageUrl:
      'https://res.cloudinary.com/ipc-media/image/upload/v1776438766/j1zlj9epgufdvdzpyndt.avif',

    tags: ['Souls-like', 'Open World', 'Fantasy', 'Hardcore'],

    systemRequirements: {
      minimum: 'Intel i5, 8GB RAM, GTX 1060',
      recommended: 'Intel i7, 16GB RAM, RTX 3060',
    },

    trailerUrl: 'https://www.youtube.com/watch?v=E3Huy2cdih0',
  },

  {
    name: 'The Witcher 3',
    genre: 'RPG',
    releaseYear: 2015,
    rating: 9.8,
    price: 39.99,
    publisher: 'CD Projekt',
    developer: 'CD Projekt Red',

    description:
      `The Witcher 3: Wild Hunt là một tựa game nhập vai thế giới mở lấy bối cảnh trong một thế giới giả tưởng u tối đầy chiến tranh, quái vật và chính trị phức tạp.
      Người chơi sẽ vào vai Geralt of Rivia – một Witcher săn quái vật chuyên nghiệp – trong hành trình tìm kiếm Ciri, người mang số phận đặc biệt.

      Game nổi bật với hệ thống nhiệm vụ phụ có chiều sâu, mỗi lựa chọn của người chơi đều ảnh hưởng đến cốt truyện và thế giới xung quanh.
      Các vùng đất trong game được thiết kế sống động, từ thành phố Novigrad đông đúc đến vùng hoang dã Skellige lạnh giá.

      Ngoài cốt truyện chính hấp dẫn, The Witcher 3 còn mang đến hàng trăm giờ nội dung phụ, hệ thống chiến đấu kết hợp kiếm thuật và phép thuật, cùng nhiều kết thúc khác nhau.`,

    platforms: ['PC', 'PS4', 'Switch'],

    imageUrl:
      'https://res.cloudinary.com/ipc-media/image/upload/v1776438766/mzyypagdcv0wxbxnhcjq.jpg',

    tags: ['RPG', 'Story Rich', 'Open World', 'Fantasy'],

    systemRequirements: {
      minimum: 'Intel i5, 6GB RAM, GTX 770',
      recommended: 'Intel i7, 16GB RAM, GTX 1060',
    },

    trailerUrl: 'https://www.youtube.com/watch?v=c0i88t0Kacs',
  },

  {
    name: 'Hollow Knight',
    genre: 'Metroidvania',
    releaseYear: 2017,
    rating: 9.0,
    price: 14.99,
    publisher: 'Team Cherry',
    developer: 'Team Cherry',

    description:
      `Hollow Knight là một tựa game phiêu lưu hành động 2D thuộc thể loại Metroidvania, lấy bối cảnh trong vương quốc ngầm Hallownest đầy bí ẩn và đổ nát.
      Người chơi điều khiển một hiệp sĩ nhỏ bé khám phá thế giới rộng lớn, chiến đấu với các sinh vật kỳ lạ và khám phá bí mật của vương quốc đã mất.

      Game nổi bật với phong cách nghệ thuật vẽ tay tinh tế, âm nhạc trầm buồn và gameplay thử thách nhưng công bằng.
      Mỗi khu vực trong game đều có thiết kế riêng biệt, từ những hang động tối tăm đến thành phố cổ bị lãng quên.

      Hollow Knight mang đến trải nghiệm khám phá tự do, hệ thống kỹ năng mở rộng dần và những trận boss mang tính biểu tượng, tạo nên một hành trình vừa cô đơn vừa cuốn hút.`,

    platforms: ['PC', 'Switch'],

    imageUrl:
      'https://res.cloudinary.com/ipc-media/image/upload/v1776438765/vfwir4nbwsefjf6gzubf.avif',

    tags: ['Indie', 'Metroidvania', '2D', 'Souls-like'],

    systemRequirements: {
      minimum: 'Intel i3, 4GB RAM',
      recommended: 'Intel i5, 8GB RAM',
    },

    trailerUrl: 'https://www.youtube.com/watch?v=UAO2urG23S4',
  },
];

mongoose
  .connect(process.env.MONGO_URI || 'mongodb://mongo:27017/gamedb')
  .then(async () => {
    await Game.deleteMany({});
    await Game.insertMany(games);
    console.log('Seeded with long descriptions!');
    process.exit(0);
  });