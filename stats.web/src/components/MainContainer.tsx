import BaseballLogo from './BaseballLogo';
import Chevron from './Chevron';

import './MainContainer.scss';

function MainContainer() {
  return (
    <main className="MainContent__mainContentContainer">
    <div className="TeamsList__teamPageContainer">
        <div className="Grid__fullWidth Grid__grid Grid__fixed TeamsList__teamPageGrid">
            <div className="Grid__grid-item" >
                <div className="TeamsList__teamPageHeader">
                    <div className="OldGrid__row OldGrid__vertical-align Title__row" role="presentation">
                        <h1 className="Text__text Text__left Text__off-black Text__base Text__xbold Title__text Text__inline-header" data-testid="teams-title">Teams</h1>
                    </div>
                </div>
                <div className="TeamsList__teamListContainer">
                    <div className="TeamsList_seasonHeader"><span className="Text__text Text__left Text__off-black Text__base Text__xbold">Spring 2023</span></div>
                    <div className="TeamsList__seasonContainer">
                        <span className="Clickable__container TeamsList__teamRow TeamsList__enabled" role="button" >
                            <div className="Avatar__container Avatar__white-background Avatar__medium">
                                <div className="Avatar__centered">
                                    <img
                                        className="Image__circle"
                                        src="https://d3dbfy0b269335.cloudfront.net/7ea86b42-974b-43cc-bfcf-b0a0ecdd6371?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9kM2RiZnkwYjI2OTMzNS5jbG91ZGZyb250Lm5ldC83ZWE4NmI0Mi05NzRiLTQzY2MtYmZjZi1iMGEwZWNkZDYzNzEiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE2ODMyNTUzNDl9fX1dfQ__&Key-Pair-Id=APKAJRB5DTSZFD2E54ZA&Signature=cfQ1igBxDLhHub-COrEZjD1yrTZspeO4rPZV5joo0x93PkKFHB~bBzodsctF-2YcG6LaXUzs2uuGnXkWC0gGaTyABGa8Wq2c8IGuJgRSavjs7JB3LgEWpoLJGQ2Uzp46dfodLrVkehKo-ew-90heSPY2GJsNVirHiR0JYbGg2wremBTPXMvhCNGvt9wunGOfGzDLqlDfcweNGhOS4PdnbF21cbwXGmOQf-WibR05Of-rnjlpG3allJ1JpM9fHtLMicExBBqS9JKCwSoRDYggMofsmOuGICdKAO~HR2xBxXmRFmKieST579HPDZ89eXBwSSWhkj6vtfSQf70dAm3jTg__"
                                        alt=""
                                    />
                                </div>
                                <div className="Avatar__sport-accessory Avatar__white-background Avatar__xsmall-border">
                                    <BaseballLogo></BaseballLogo>
                                </div>
                            </div>
                            <div className="TeamsList__teamName"><span className="Text__text Text__left Text__off-black Text__base Text__semibold">Pony Express Blue 13U</span></div>
                            <div className="TeamsList__teamGroup">
                                <div className="TeamsList__chevron">
                                    <Chevron></Chevron>
                                </div>
                            </div>
                        </span>
                        <span className="Clickable__container TeamsList__teamRow TeamsList__enabled" role="button" >
                            <div className="Avatar__container Avatar__white-background Avatar__medium">
                                <div className="Avatar__centered">
                                    <img
                                        className="Image__circle"
                                        src="https://d3dbfy0b269335.cloudfront.net/5ee25ce0-e7e6-4c54-892b-de6f3f166c51?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9kM2RiZnkwYjI2OTMzNS5jbG91ZGZyb250Lm5ldC81ZWUyNWNlMC1lN2U2LTRjNTQtODkyYi1kZTZmM2YxNjZjNTEiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE2ODMyNTUzNDl9fX1dfQ__&Key-Pair-Id=APKAJRB5DTSZFD2E54ZA&Signature=M7WpfOt1D8aF8ZxyyTKJuhy48Y7mPE196T9QCCeNUXFaHwImKJRiHszbihuGp0NfhLk1V~PzWa7QEOrAm8TX4pB0eUeFJRelVNy4oKV2LEfSLxEPTMksUv1U0TZEZu5JyKmYe2IRHgjIRS4JGsd~0n2duPLxcjDzXnBQVAlDUNcseu1xK45DLdPBZfeuHfNH5bANwu5R2w4FHGWmVLNL9iHyiasPYFO2u-UcoRx9Cb0hX4zwKydpqZ99fbWaui7t-xlWQGQ0TRH-mSy5eZHRsA9Nm~XhWIg9jua05Xb88rhpszUQjLCgR5dKR0h1OnI8Sh8CXWwwipzxKSqVqLZiaw__"
                                        alt=""
                                    />
                                </div>
                                <div className="Avatar__sport-accessory Avatar__white-background Avatar__xsmall-border">
                                <BaseballLogo></BaseballLogo>
                                </div>
                            </div>
                            <div className="TeamsList__teamName"><span className="Text__text Text__left Text__off-black Text__base Text__semibold">2023 MC PONY EXPRESS 11U</span></div>
                            <div className="TeamsList__teamGroup">
                                <div className="TeamsList__chevron">
                                <Chevron></Chevron>
                                </div>
                            </div>
                        </span>
                        <span className="Clickable__container TeamsList__teamRow TeamsList__enabled" role="button" >
                            <div className="Avatar__container Avatar__white-background Avatar__medium">
                                <div className="Avatar__centered">
                                    <img
                                        className="Image__circle"
                                        src="https://d3dbfy0b269335.cloudfront.net/1828bc17-dad5-4f57-9f5a-2968e984d0fa?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9kM2RiZnkwYjI2OTMzNS5jbG91ZGZyb250Lm5ldC8xODI4YmMxNy1kYWQ1LTRmNTctOWY1YS0yOTY4ZTk4NGQwZmEiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE2ODMyNTUzNDl9fX1dfQ__&Key-Pair-Id=APKAJRB5DTSZFD2E54ZA&Signature=OJygAXsNh-o-ozKo9tgSAoY-8SKJheh0QJRSf8fRD5xbZfgRWlG3mZUMmKVUqloq8PMV~3XlFoLGeAi6claJqOzMRX2vpeA5pbtQJKTJ9PAH3D-DwrB-kcwMxxsolfbuNUgqjZQmsnwKQ3yJFxGgWZKrI2Nupj6DIAjC5pbOpI1Ei4oKBg-F5oczo~AgQUWzcBs3wVclJwWJ9appKNUC-6LUe2giMSi9yA2yA0wmEqIq5z9dQid8jnDcJLkVHS~vNME72WjYJVFklMuEI8EDk2dtM7SdtVWJZokseYqnCI05OuCZV4Ehgx8hWTOzFpCPQ9qONUL24k7XG9bM6onyAQ__"
                                        alt=""
                                    />
                                </div>
                                <div className="Avatar__sport-accessory Avatar__white-background Avatar__xsmall-border">
                                <BaseballLogo></BaseballLogo>
                                </div>
                            </div>
                            <div className="TeamsList__teamName"><span className="Text__text Text__left Text__off-black Text__base Text__semibold">Renegades Red 10U</span></div>
                            <div className="TeamsList__teamGroup">
                                <div className="TeamsList__chevron">
                                <Chevron></Chevron>
                                </div>
                            </div>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</main>
  );
}

export default MainContainer;