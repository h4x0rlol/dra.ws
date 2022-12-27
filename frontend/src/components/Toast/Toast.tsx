import { ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './Toast.module.scss';

export const Toast = (): JSX.Element => {
	return (
		<ToastContainer
			position="top-center"
			autoClose={500}
			hideProgressBar
			newestOnTop={Boolean(true)}
			closeButton={Boolean(false)}
			closeOnClick
			limit={1}
			rtl={false}
			pauseOnFocusLoss
			draggable
			pauseOnHover
			className={styles.toast}
			transition={Slide}
		/>
	);
};
