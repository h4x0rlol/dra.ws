import { observer } from 'mobx-react-lite';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Id, toast } from 'react-toastify';
import { Toast } from 'src/components/Toast/Toast';
import canvasStore from 'src/store/canvasStore';
import lobbyStore from 'src/store/lobbyStore';
import toolStore from 'src/store/toolStore';
import { preventNegativeValue } from 'src/utils/helpers';
import {
	ClearIcon,
	DownloadIcon,
	RedoIcon,
	UndoIcon,
} from 'src/components/Svg';
import styles from './SettingsBar.module.scss';

export const SettingsBar: React.FC = observer((): JSX.Element => {
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
			let value = preventNegativeValue(Number(e.target.value));
			if (value > 50) {
				value = 50;
			}
			toolStore.setLineWidth(value);
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
		const dataUrl = canvasStore.canvas?.toDataURL('image/jpeg');
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
						onChange={handleColorChange}
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
						onChange={handleLineWidthChange}
						onClick={handleNotChosen}
					/>
					<input
						type="number"
						min={1}
						max={50}
						className={styles.input}
						value={toolStore.lineWidth}
						onChange={handleLineWidthChange}
						onClick={handleNotChosen}
					/>
				</div>

				<div className={styles.item}>
					<p className={styles.p}>{t('settingsBar.lineType')}</p>
					<select
						value={toolStore.lineType}
						onChange={handleLineTypeChange}
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
						onChange={handleFillChange}
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
});
