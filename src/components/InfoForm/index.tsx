import { createSignal, type Component, createMemo, JSX } from 'solid-js';
import FromBg from '../../assets/form-bg.png'
import './index.less';
import { api } from '../../services/api';
import { Utils } from '../../utils/Utils';
import Toast from '../Toast';

interface Props {
    getVisible: (value: boolean) => void
}

const InfoForm: Component<Props> = (props: Props) => {
    const [nameErrorVisible, setNameErrorVisible] = createSignal<boolean>(false);
    const [passportErrorVisible, setPassportErrorVisible] = createSignal<boolean>(false);
    const [name, setName] = createSignal<string>('');
    const [passport, setPassport] = createSignal<string>('');
    const [email, setEmail] = createSignal<string>('');

    const errorTipStyle = createMemo(() => ({
        display: nameErrorVisible() || passportErrorVisible() ? 'flex' : 'none'
    }))

    const nameOutlineStyle = createMemo(() => ({
        border: nameErrorVisible() ? '1px solid red' : ''
    }))    
    
    const passportOutlineStyle = createMemo(() => ({
        border: passportErrorVisible() ? '1px solid red' : ''
    }))

    const handleSubmit = () => {
        if (!name()) {
            setNameErrorVisible(true)
        } else {
            setNameErrorVisible(false)
        }
        if (!passport()) {
            setPassportErrorVisible(true)
        } else {
            setPassportErrorVisible(false)
        }
        if (!name() || !passport()) return false
        api.commit({
            channel: Utils.queryUrl('channel') as string ?? 'unknown',
            name: name(),
            passportNo: passport(),
            email: email()
        }).then((res) => {
            Toast('Submit successfully')
            props.getVisible(false)
            resetForm()
        })
    }

    const handleClose = () => {
        props.getVisible(false)
        resetForm()
    }

    const resetForm = () => {
        setName('')
        setPassport('')
        setEmail('')
        setNameErrorVisible(false)
        setPassportErrorVisible(false)
    }

    return (
        <div class='formBox'>
            <img class='formBg' src={FromBg} alt="form" />
            <div class='formInput'>
                <input
                    class='input name'
                    type="text"
                    placeholder='Name'
                    style={nameOutlineStyle()}
                    value={name()}
                    onInput={e => setName(e.target.value)}
                />
                <input
                    class='input passport'
                    type="text"
                    placeholder='Passport No'
                    value={passport()}
                    style={passportOutlineStyle()}
                    onInput={e => setPassport(e.target.value)}
                />
                <input
                    class='input email'
                    type="email"
                    placeholder='E-Mail'
                    value={email()}
                    onInput={e => setEmail(e.target.value)}
                />
                <p class='errorTip' style={errorTipStyle()}>Please fill in your information</p>
            </div>
            <div class='submit' onClick={handleSubmit}></div>
            <div class='close' onClick={handleClose}>×</div>
        </div>
    );
};

export default InfoForm;
