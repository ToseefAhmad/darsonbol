/*
 * Copyright (c) 2022. Shaymaa Saied
 * @namespace MagearabScandipwaInitconfig/Util/Colors
 */

export class Colors {
    static setColor(proberty, color) {
        document.documentElement.style.setProperty(`--${proberty}`, color);
    }
}

export default Colors;
