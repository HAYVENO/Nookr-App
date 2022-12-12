import { TIMEOUT_SEC } from "./config";

//Timeout for Promise
const timeout = function (s) {
	return new Promise(function (_, reject) {
		setTimeout(function () {
			reject(new Error(`Request took too long! Timeout after ${s} seconds`));
		}, s * 1000);
	});
};

export const getJSON = async function (url) {
	try {
		// console.log(url);
		const res = await Promise.race([timeout(TIMEOUT_SEC), fetch(url)]);
		if (!res.ok) return console.log(res);
		const data = await res.json();
		if (data.status === "fail") throw new Error(data);
		return data;
	} catch (err) {
		console.error(err);
		throw err;
	}
};

export const sendJSON = async function (url, uploadData) {
	try {
		const fetchPro = fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(uploadData),
		});
		const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
		const data = await res.json();
		if (!res.ok) throw new Error(`${data.message} (${res.status})`);
		if (!data) console.log("no data");
		return data;
	} catch (err) {
		console.error(err);
		// throw err;
	}
};

// export const sendJSON = async function (url, uploadData) {
//   try {
//     const fetchPro = fetch(url, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(uploadData),
//     });

//     const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
//     const data = await res.json();

//     if (!res.ok) throw new Error(`${data.message} (${res.status})`);
//     return data;
//   } catch (err) {
//     throw err;
//   }
// };
