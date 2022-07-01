import { observer } from 'mobx-react-lite';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Toast } from 'src/components/Toast/Toast';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast, Id, Zoom, Slide } from 'react-toastify';
import { Methods } from 'src/api/methods';
import canvasStore from 'src/store/canvasStore';
import lobbyStore from 'src/store/lobbyStore';
import toolStore from 'src/store/toolStore';
import { preventNegativeValue } from 'src/utils/helpers';
import ClearIcon from '../../Svg/ClearIcon';
import DownloadIcon from '../../Svg/DownloadIcon';
import RedoIcon from '../../Svg/RedoIcon';
import UndoIcon from '../../Svg/UndoIcon';

import styles from './SettingsBar.module.scss';

const SettingsBar: React.FC = (): JSX.Element => {
	const { t } = useTranslation();

	const toolNotify = (): Id =>
		toast('Select tool', {
			toastId: 'toolNotify',
		});

	const handleNotChosen = (): void => {
		if (!toolStore.tool) {
			toolNotify();
		}
	};

	const handleColorChange = (
		e: React.ChangeEvent<HTMLInputElement>
	): void => {
		if (toolStore.tool) {
			toolStore.setColor(e.target.value);
		}
	};

	const handleLineWidthChange = (
		e: React.ChangeEvent<HTMLInputElement>
	): void => {
		if (toolStore.tool) {
			preventNegativeValue(Number(e.target.value));
			if (Number(e.target.value) > 50) e.target.value = '50';
			toolStore.setLineWidth(Number(e.target.value));
		}
	};

	const handleLineTypeChange = (
		e: React.ChangeEvent<HTMLSelectElement>
	): void => {
		if (toolStore.tool) {
			toolStore.setLineType(e.target.value);
		}
	};

	const handleFillChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		if (toolStore.tool) {
			toolStore.setFill(e.target.checked);
		}
	};

	const download = (): void => {
		const dataUrl = canvasStore.canvas?.toDataURL();
		const a = document.createElement('a');
		if (dataUrl) {
			a.href = dataUrl;
			a.download = `${lobbyStore?.sessionId}.jpg`;
			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);
		}
	};

	return (
		<div className={styles.wrapper}>
			<div className={styles.container}>
				<div className={styles.item}>
					<p className={styles.p}>{t('settingsBar.colorInput')}</p>
					<input
						type="color"
						className={styles.color_input}
						value={toolStore.color}
						onChange={(e) => handleColorChange(e)}
						onClick={handleNotChosen}
					/>
				</div>

				<div className={styles.item}>
					<p className={styles.p}>{t('settingsBar.penSize')}</p>
					<input
						type="range"
						min={1}
						max={50}
						step={1}
						className={styles.range_input}
						value={toolStore.lineWidth}
						onChange={(e) => handleLineWidthChange(e)}
						onClick={handleNotChosen}
					/>
					<input
						type="number"
						min={0}
						max={50}
						className={styles.input}
						value={toolStore.lineWidth}
						onChange={(e) => handleLineWidthChange(e)}
						onClick={handleNotChosen}
					/>
				</div>

				<div className={styles.item}>
					<p className={styles.p}>{t('settingsBar.lineType')}</p>
					<select
						value={toolStore.lineType}
						onChange={(e) => handleLineTypeChange(e)}
						onClick={handleNotChosen}
						name="lineType"
						id="lineType"
						className={styles.select}
					>
						<option value="default" className={styles.option}>
							&#8213;&#8213;&#8213;
						</option>
						<option value="dashed" className={styles.option}>
							&#45; &#45; &#45; &#45; &#45;
						</option>
						<option value="dotted" className={styles.option}>
							&#183;&#183;&#183;&#183;&#183;&#183;&#183;&#183;&#183;
						</option>
					</select>
				</div>

				<div className={styles.item}>
					<p className={styles.p}>{t('settingsBar.fill')}</p>
					<input
						type="checkbox"
						checked={toolStore.fill}
						onChange={(e) => handleFillChange(e)}
						onClick={handleNotChosen}
						className={styles.checkbox}
					/>
				</div>

				<div className={styles.item}>
					<button
						type="button"
						className={styles.button}
						onClick={() => canvasStore.undo()}
					>
						<UndoIcon className={styles.svg} />
					</button>
					<button
						type="button"
						className={styles.button}
						onClick={() => canvasStore.redo()}
					>
						<RedoIcon className={styles.svg} />
					</button>
				</div>

				<div className={styles.item}>
					<button
						type="button"
						className={styles.button}
						onClick={() => canvasStore.clear()}
					>
						<ClearIcon className={styles.svg} />
					</button>
				</div>

				<div className={styles.item}>
					<button
						type="button"
						className={styles.button}
						onClick={download}
					>
						<DownloadIcon className={styles.svg} />
					</button>
				</div>
			</div>
			<Toast />
		</div>
	);
};

export default observer(SettingsBar);
