import { createSignal, type Component } from 'solid-js';
import PlanTwoHome from '@assets/plan2-home.jpg'
import './index.less';
import ShopPart from '@components/Parts/Shop';
import DetailPart from '@components/Parts/Detail';
import Overlay from '@components/Overlay';
import InfoForm from '@components/InfoForm';
import { api } from '@services/api';
import { Utils } from '@utils/Utils';

const PlanOne: Component = () => {
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
            <img class="PlanImg" src={PlanTwoHome} alt="首页" />
            <div class="registerBtn" onClick={handleRegister}></div>
            <ShopPart />
            <DetailPart />
            <Overlay
                visible={getVisible()}
                style={{
                    height: '100%',
                    'align-items': 'center',
                    'justify-content': 'center'
                }}
                onClick={() => { setVisible((prev: boolean) => !prev) }}
            >
                <InfoForm getVisible={() => setVisible(false)}/>
            </Overlay>
        </>
    );
};

export default PlanOne;
