import { observer } from 'mobx-react-lite';
import React from 'react';
import { useTranslation } from 'react-i18next';
import canvasStore from 'src/store/canvasStore';
import toolStore from 'src/store/toolStore';
import { preventNegativeValue } from 'src/utils/helpers';
import ClearIcon from '../../Svg/ClearIcon';
import DownloadIcon from '../../Svg/DownloadIcon';
import RedoIcon from '../../Svg/RedoIcon';
import UndoIcon from '../../Svg/UndoIcon';
import styles from './SettingsBar.module.scss';

const SettingsBar: React.FC = (): JSX.Element => {
	const { t } = useTranslation();

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
					/>
					<input
						type="number"
						min={0}
						max={50}
						className={styles.input}
						value={toolStore.lineWidth}
						onChange={(e) => handleLineWidthChange(e)}
					/>
				</div>

				<div className={styles.item}>
					<p className={styles.p}>{t('settingsBar.lineType')}</p>
					<select
						value={toolStore.lineType}
						onChange={(e) => handleLineTypeChange(e)}
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
					<button type="button" className={styles.button}>
						<DownloadIcon className={styles.svg} />
					</button>
				</div>
			</div>
		</div>
	);
};

export default observer(SettingsBar);
