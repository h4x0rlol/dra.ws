import { observer } from 'mobx-react-lite';
import React from 'react';
import GitHubButton from 'react-github-btn';
import { useTranslation } from 'react-i18next';
import themeStore from 'src/store/themeStore';
import { getRandomColor, getWelcomeMessage } from 'src/utils/helpers';
import { ThemeToggle } from 'src/components/ThemeToggle';
import { LobbyContainer } from './LobbyContainer/LobbyContainer';
import styles from './Welcome.module.scss';

const welcomeMessage = getWelcomeMessage();

const Letter: React.FC<{ letter: string }> = ({
	letter,
}: {
	letter: string;
}): JSX.Element => {
	return (
		<span
			style={{
				color: getRandomColor(),
			}}
		>
			{letter}
		</span>
	);
};

export const Welcome: React.FC = observer((): JSX.Element => {
	const { t } = useTranslation();

	return (
		<div className={styles.wrapper}>
			<div className={styles.background} />
			<div className={styles.welcome}>
				<div className={styles.info_wrapper}>
					<div className={styles.greeting}>
						{welcomeMessage.map((letter, index) => {
							return (
								<Letter
									key={`${index + 1}-${letter}`}
									letter={letter}
								/>
							);
						})}
					</div>

					<div className={styles.info}>
						<div className={styles.theme_button}>
							<ThemeToggle />
						</div>
						<div className={styles.github_button}>
							<GitHubButton
								href="https://github.com/h4x0rlol/dra.ws"
								data-size="large"
								data-color-scheme={
									themeStore.theme === 'dark'
										? 'dark_dimmed'
										: 'light'
								}
								data-icon="octicon-star"
								aria-label="Star h4x0rlol/dra.ws on GitHub"
							>
								Star
							</GitHubButton>
						</div>
					</div>
				</div>

				<div className={styles.description}>
					{t('home.description')}
					<br />
					<br />
					{t('home.share')}
				</div>
				<LobbyContainer />
			</div>
		</div>
	);
});
