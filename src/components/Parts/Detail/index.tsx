import { createSignal, type Component } from 'solid-js';
import ShowTwo from '../../../assets/show2.jpg';
import styles from './index.module.css';
import Overlay from '../../Overlay';
import InfoForm from '../../InfoForm';
import { api } from '../../../services/api';
import { Utils } from '../../../utils/Utils';

const DetailPart: Component = () => {
    const [getVisible, setVisible] = createSignal<boolean>(false);

    const handleRegister = () => {
        api.regist({
            channel: Utils.queryUrl('channel') as string ?? 'unknown',
        }).then((res) => {
            setVisible((prev: boolean) => !prev);
        })
    }

    return (
        <>
            <div class={styles.part3}>
                <div class={styles.header}>
                    <h3 class={styles.title}>Payment Comparison</h3>
                    <p class={styles.text}>Credit Card I Cash I Mobile Digital</p>
                </div>
                <div class={styles.line}></div>
                <img class={styles.PlanImg} src={ShowTwo} alt="细节展示" />
            </div>

            <div class={styles.part4}>
                <div class={styles.header}>
                    <h3 class={styles.title}>Amazing Tour China Mobile Payment Service</h3>
                    <p class={styles.text}>Fast, Convenient, Rechargeable, Variety.</p>
                </div>
                <div class={styles.line}></div>

                <table>
                    <tbody>
                        <tr class={styles.bgColor}>
                            <td>Package</td>
                            <td>Recharge amount (USD)</td>
                        </tr>
                        <tr>
                            <td>Preliminary</td>
                            <td>500</td>
                        </tr>
                        <tr class={styles.bgColor}>
                            <td>Upgrade</td>
                            <td>1000</td>
                        </tr>
                        <tr>
                            <td>Replenish</td>
                            <td>100</td>
                        </tr>
                    </tbody>
                </table>

                <div class={styles.header}>
                    <h3 class={styles.title}>Service Instructions</h3>
                </div>
                <div class={styles.line}></div>

                <div class={styles.serviceBox}>
                    <div class={styles.box} style={{ background: '#eee' }}>
                        <p class={styles.fw}>1.Recharge Problem :</p>
                        <p>After placing an order on the website, customers can wait patiently, CNY recharge to the account.</p>
                    </div>
                    <div class={styles.box}>
                        <p class={styles.fw}>2.Return and Exchange Problems :</p>
                        <p>Daily Exchange to follow the Latest Currency before Payment.No Refund Available during the order.</p>
                    </div>
                    <div class={styles.box} style={{ background: '#eee' }}>
                        <p class={styles.fw}>3.Find Customer Service :</p>
                        <p>If it cannot be used, please call the 24-hour service hotline 13924594545 or our email address to help you solve related problems.</p>
                    </div>
                </div>

                <button class={styles.btn} onClick={handleRegister}>Registration</button>
            </div>

            <Overlay
                visible={getVisible()}
                style={{
                    height: '100%',
                    'align-items': 'center',
                    'justify-content': 'center'
                }}
                onClick={() => { setVisible((prev: boolean) => !prev) }}
            >
                <InfoForm getVisible={() => setVisible(false)} />
            </Overlay>
        </>
    );
};

export default DetailPart;
