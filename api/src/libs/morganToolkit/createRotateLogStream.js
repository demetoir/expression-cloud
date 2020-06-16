const rotatingFileStream = require('rotating-file-stream');

// repository root path
const LOG_DIRECTORY_PATH = '../../.log';

/**
 *
 * @param signature {string} 로그 구분을 위한 signature string
 * 아래 옵션은 rotating-file-stream의 옵션과 동일
 * @param size {string}
 * @param interval {string}
 * @param path {string}
 * @param compress {string} 압축옵션
 * @param intervalBoundary {boolean}
 * @param initialRotation {boolean}
 */
function createRotateLogStream({
	signature = 'morgan',
	size = '10M',
	interval = '1d', // rotate daily
	path,
	compress = 'gzip',
	intervalBoundary = true,
	initialRotation = true,
} = {}) {
	path = path || require('path').join(__dirname, LOG_DIRECTORY_PATH);

	// ref https://www.npmjs.com/package/rotating-file-stream
	const pad = (num) => (num > 9 ? '' : '0') + num;
	const generator = (time, index) => {
		if (!time) return `${signature}.log`;

		const month = `${time.getFullYear()}.${pad(time.getMonth() + 1)}`;
		const day = pad(time.getDate());
		const hour = pad(time.getHours());
		const minute = pad(time.getMinutes());

		return `/${signature}/${month}/${month}${day}-${hour}${minute}-${index}-file.log`;
	};

	// create a rotating write stream
	return rotatingFileStream.createStream(generator, {
		size,
		interval,
		path,
		compress,
		intervalBoundary,
		initialRotation,
	});
}

module.exports.createRotateLogStream = createRotateLogStream;
