import type { Component } from 'solid-js';
import ShowOne from '../../../assets/show1.jpg'

import styles from './index.module.css';

const ShopPart: Component = () => {
    return (
        <div class={styles.part2}>
            <div class={styles.header}>
                <h3 class={styles.title}>The mainstream payment method in China</h3>
                <p class={styles.text}>Fast I Convenient I Smart I Security I Variety I Universal</p>
            </div>
            <div class={styles.line}></div>
            <img class={styles.PlanImg} src={ShowOne} alt="商品展示" />
        </div>
    );
};

export default ShopPart;
