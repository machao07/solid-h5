import type { Component } from 'solid-js';
import ShowOne from '@assets/show1.jpg'
import './index.less';

const ShopPart: Component = () => {
    return (
        <div class="part2">
            <div class="header">
                <h3 class="title">The mainstream payment method in China</h3>
                <p class="text">Fast I Convenient I Smart I Security I Variety I Universal</p>
            </div>
            <div class="line"></div>
            <img class="PlanImg" src={ShowOne} alt="商品展示" />
        </div>
    );
};

export default ShopPart;
