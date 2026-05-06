
import { WEAPON_DB } from "./weaponDB.js";
console.log(WEAPON_DB);

const { max, round, min, pow } = Math;

const clamp = (v) => {
    return max(0, min(1, v));
}

const median = (a, b) => (a + b) / 2;
const mix = (a, b, t) => a * (1 - t) + b * t;
const scale = x => pow(x, 0.8); 
const combine = (a, b, m) => {
    const base = (a + b) / 2;
    return pow(base, 1.15) * m;
};

/*
 * Weapon Create
*/

const weaponCreate = () => {
	let w = {};
	w.name 		= wc_name.value;
	w.damage 	= wc_damage.value;
	w.cooldown 	= wc_cooldown.value;
	w.precision = wc_precision.value;
	w.weight 	= wc_weight.value;
	w.recoil 	= wc_recoil.value;

	WEAPON_DB.push(w);

	document.querySelectorAll(".weaponOptions").forEach((e) => {
		let opt = document.createElement("option");
		opt.innerHTML = w.name;
		e.append(opt);
	});

	wc_name.value = "";
	wc_damage.value = "";
	wc_cooldown.value = "";
	wc_precision.value = "";
	wc_weight.value = "";
	wc_recoil.value = "";
}

wc_submit.onclick = weaponCreate;

/*
 * when player morphs two weapons
 * it has a chance to be COMMON, EPIC, LEGENDARY
 * each oportunity having its own weight values
*/

const RARITY = {
	Common 		: "COMMON",
	Epic 		: "EPIC",
	Legendary 	: "LEGENDARY",
}

const weaponGetRarityMultipliers = (rarity) => {
	let m = {
		damage : 1,
		recoil : 1,
		cooldown : 1,
		precision : 1,
		weight : 1,
	}

	switch (rarity) {
		case RARITY.Common:
			m.damage = 1;
			m.recoil = 1;
			m.precision = 1.5;
			m.weight = 1.25;
			m.cooldown = 1.10;

			break;

		case RARITY.Epic:
			m.damage = 1.16;
			m.recoil = 0.95;
			m.precision = 0.55;
			m.weight = 1.10;
			m.cooldown = 0.95;

			break;

		case RARITY.Legendary:
			m.damage = 1.38;
			m.recoil = 1.2;
			m.precision = 0.83;
			m.weight = 0.95;
			m.cooldown = 0.9;

			break;
	}

	return m;
}

const format = (a, b, c) => {
  return String(a).padStart(6) + " → " +
         String(b).padStart(6) + " = " +
         String(c).padStart(6);
}

const weaponMorph = () => {
	const w1 = weaponFindByName(weapon1.value);
	const w2 = weaponFindByName(weapon2.value);

	console.log(w1, w2);

	let w3 = {};
	let m = weaponGetRarityMultipliers(
		rarityOption.value
	);

	const r = 10000;

	w3.damage = round(combine(w1.damage, w2.damage, m.damage * r)) / r;

	w3.recoil = round(max(w1.recoil, w2.recoil) * m.recoil * r) / r;

	w3.precision = round(max(w1.precision, w2.precision) * m.precision * r) / r;

	w3.weight = clamp(round(min(w1.weight, w2.weight) / m.weight * r) / r);

	w3.cooldown = round(max(w1.cooldown, w2.cooldown) * m.cooldown * r) / r;

	for (const key in w3) {
		//document.getElementById("display_"+key).innerHTML = w1[key] + " → " +w2[key] + " : " + w3[key];

		let val = format(w1[key], w2[key], w3[key]);
		document.getElementById("display_"+key).innerHTML =	val;
	}
	
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

