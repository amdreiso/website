
import { WEAPON_DB } from "./weaponDB.js";
console.log(WEAPON_DB);

/*
 * when player morphs two weapons
 * it has a chance to be COMMON, EPIC, LEGENDARY
 * each oportunity having its own weight values
*/

const weaponMorph = () => {
	const w1 = weaponFindByName(weapon1.value);
	const w2 = weaponFindByName(weapon2.value);

	let w3 = {};
	let m = {
		damage : 0.5
	};

	w3.damage = (w1.damage + w2.damage) * m.damage;
	
	console.log(w3);
}

document.querySelectorAll(".weaponOptions").forEach((e) => {
	for (const w of WEAPON_DB) {
		let opt = document.createElement("option");
		opt.innerHTML = w.name;
		e.append(opt);
	}
});

const weaponFindByName = (name) => {
	for (const w of WEAPON_DB) {
		if (w.name === name) {
			return w;
		}
	}
	return undefined;
}

morphButton.onclick = weaponMorph;

