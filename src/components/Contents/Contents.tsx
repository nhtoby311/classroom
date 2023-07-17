import styled from 'styled-components';
import Slider from '../Slider/Slider';
import BubbleIcon from '../BubbleIcon/BubbleIcon';
import RefreshArrowSVG from '../SVG/RefreshArrowSVG';
import FastForwardSVG from '../SVG/FastForwardSVG';
import useStore from '../../store/store';
import PlaySVG from '../SVG/PlaySVG';
import PauseSVG from '../SVG/PauseSVG';
import SlowBackSVG from '../SVG/SlowBackSVG';
import { formatTime } from '../../utils/time';
import { useEffect, useMemo } from 'react';

export default function Contents() {
	const resetTime = useStore((state) => state.resetTime);
	const pauseTime = useStore((state) => state.setIsPaused);
	const isPaused = useStore((state) => state.isPaused);
	const setFactor = useStore((state) => state.setFactor);
	const factor = useStore((state) => state.factor);
	const currentTime = useStore((state) => state.currentTime);

	const setCurrentTheme = useStore((state) => state.setTheme);
	const isDayNightCycle = useStore((state) => state.isDayNightCycle);
	const setIsDayNightCycle = useStore((state) => state.setIsDayNightCycle);

	const startTime = 11;
	const convertTime = useMemo(
		() => currentTime * 14.4 + startTime * 60,
		[currentTime]
	);
	const mimicTime = useMemo(
		() => (convertTime > 1440 ? convertTime - 1440 : convertTime),
		[convertTime]
	);

	useEffect(() => {
		if (isDayNightCycle) {
			if (mimicTime >= 300 && mimicTime < 700) {
				setCurrentTheme('yellow');
			} else if (mimicTime >= 700 && mimicTime < 1100) {
				setCurrentTheme('light');
			} else if (
				mimicTime >= 1100 ||
				(mimicTime > 0 && mimicTime < 300)
			) {
				setCurrentTheme('dark');
			}
		}
		//console.log(mimicTime);
	}, [mimicTime, isDayNightCycle]);

	return (
		<Wrapper>
			<Container>
				<Hero>
					<Top />

					<Bottom>
						<div></div>
						<SliderCont>
							<h3>TIME</h3>
							<Slider />
							<SliderInfo>
								<OtherControlsCont>
									<BubbleIcon onClickCB={resetTime}>
										<RefreshArrowSVG />
									</BubbleIcon>
									<BubbleIcon
										onClickCB={() => pauseTime(!isPaused)}>
										{isPaused ? <PlaySVG /> : <PauseSVG />}
									</BubbleIcon>
								</OtherControlsCont>

								<h2>{formatTime(mimicTime)}</h2>
								<ControlsCont>
									<BubbleIcon
										onClickCB={() => {
											if (factor > 1)
												setFactor(factor / 2);
										}}>
										<SlowBackSVG />
									</BubbleIcon>
									<p>{factor}x</p>
									<BubbleIcon
										onClickCB={() => {
											if (factor < 10)
												setFactor(factor * 2);
										}}>
										<FastForwardSVG />
									</BubbleIcon>
								</ControlsCont>
							</SliderInfo>
						</SliderCont>

						<div style={{ pointerEvents: 'all' }}>
							<button onClick={() => setCurrentTheme('yellow')}>
								Yellow
							</button>
							<button onClick={() => setCurrentTheme('b&w')}>
								B&W
							</button>
							<button onClick={() => setCurrentTheme('dark')}>
								Dark
							</button>
							<button onClick={() => setCurrentTheme('light')}>
								Light
							</button>

							<button
								onClick={() =>
									setIsDayNightCycle(!isDayNightCycle)
								}>
								{isDayNightCycle + ''}
							</button>
						</div>
					</Bottom>
				</Hero>
			</Container>
		</Wrapper>
	);
}

const Wrapper = styled.div`
	display: flex;
	position: relative;
	flex-direction: column;
	width: 100%;
	justify-content: center;
	align-items: center;
	min-height: 100%;
	pointer-events: none;
`;

const Container = styled.div`
	display: flex;
	position: relative;
	flex-direction: column;
	width: 95%;
	max-width: 1920px;
	min-height: 100%;
	pointer-events: none;
	color: white;

	@media (max-width: 700px) {
		width: 100%;
	}
`;

const Hero = styled.div`
	display: flex;
	position: relative;
	flex-direction: column;
	justify-content: space-between;
	width: 100%;
	height: 100dvh;
`;

const Top = styled.div`
	display: flex;
`;

const Bottom = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: flex-end;
	padding: 30px 50px;
	width: 100%;
	@media (max-width: 700px) {
		padding: 20px 10px;
	}
`;

const SliderCont = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 20px;
	pointer-events: all;
	h3 {
		font-size: 28px;
		font-weight: 500;

		@media (max-width: 700px) {
			font-size: 20px;
		}
	}
`;

const SliderInfo = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 40px;
	h2 {
		font-size: 81px;
		font-weight: 700;
		width: 250px;
		text-align: center;
		user-select: none;

		@media (max-width: 700px) {
			font-size: 60px;
		}
	}
	@media (max-width: 700px) {
		flex-direction: column;
		gap: 10px;
	}
`;

const OtherControlsCont = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 40px;
	@media (max-width: 700px) {
		gap: 10px;
	}
`;

const ControlsCont = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 12px;
	p {
		user-select: none;
	}
`;
