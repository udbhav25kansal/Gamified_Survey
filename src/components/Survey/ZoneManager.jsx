import React, { useState } from 'react';
import Zone0_Intro from './Zones/Zone0_Intro';
import Zone1_SourceTracking from './Zones/Zone1_SourceTracking';
import Zone2_PlayStyle from './Zones/Zone2_PlayStyle';
import Zone3_PlayFrequency from './Zones/Zone3_PlayFrequency';
import Zone4_PlayPartners from './Zones/Zone4_PlayPartners';
import Zone5_GamesOwned from './Zones/Zone5_GamesOwned';
import Zone6_Location from './Zones/Zone6_Location';
import Zone7_Age from './Zones/Zone7_Age';
import BinaryQuestion from './BinaryQuestion';
import BowlingAlley from './BowlingAlley';
import DriveThru from './DriveThru';

const ZoneManager = () => {
    const [currentZone, setCurrentZone] = useState(0);
    const [surveyData, setSurveyData] = useState({
        sourceTracking: null,
        playStyle: null,
        playFrequency: null,
        playPartners: null,
        gamesOwned: null,
        location: null,
        age: null
    });

    const handleAnswer = (answer) => {
        console.log("Answer:", answer);
    };

    const handleZone0Complete = () => {
        console.log("Zone 0 complete! Moving to Zone 1...");
        setCurrentZone(1);
    };

    const handleZone1Complete = (selectedPortal) => {
        console.log("Zone 1 complete! Source:", selectedPortal);
        setSurveyData(prev => ({ ...prev, sourceTracking: selectedPortal }));
        setCurrentZone(2);
    };

    const handleZone2Complete = (selectedStyle) => {
        console.log("Zone 2 complete! Play style:", selectedStyle);
        setSurveyData(prev => ({ ...prev, playStyle: selectedStyle }));
        setCurrentZone(3);
    };

    const handleZone3Complete = (selectedFrequency) => {
        console.log("Zone 3 complete! Play frequency:", selectedFrequency);
        setSurveyData(prev => ({ ...prev, playFrequency: selectedFrequency }));
        setCurrentZone(4);
    };

    const handleZone4Complete = (selectedPartners) => {
        console.log("Zone 4 complete! Play partners:", selectedPartners);
        setSurveyData(prev => ({ ...prev, playPartners: selectedPartners }));
        setCurrentZone(5);
    };

    const handleZone5Complete = (selectedGames) => {
        console.log("Zone 5 complete! Games owned:", selectedGames);
        setSurveyData(prev => ({ ...prev, gamesOwned: selectedGames }));
        setCurrentZone(6);
    };

    const handleZone6Complete = (selectedLocation) => {
        console.log("Zone 6 complete! Location:", selectedLocation);
        setSurveyData(prev => ({ ...prev, location: selectedLocation }));
        setCurrentZone(7);
    };

    const handleZone7Complete = (selectedAge) => {
        console.log("Zone 7 complete! Age:", selectedAge);
        setSurveyData(prev => ({ ...prev, age: selectedAge }));
        setCurrentZone(8);
    };

    return (
        <>
            {/* ZONE 0: Welcome & Intro with Deca Bot */}
            <Zone0_Intro
                onComplete={handleZone0Complete}
                videoUrl="/videos/deca-intro.mp4"
            />

            {/* ZONE 1: Source Tracking - How'd you find us? */}
            <Zone1_SourceTracking
                onComplete={handleZone1Complete}
            />

            {/* ZONE 2: Play Style - Floating Islands with Fantasy Aesthetic */}
            <Zone2_PlayStyle
                onComplete={handleZone2Complete}
            />

            {/* ZONE 3: Play Frequency - Speed Lanes */}
            <Zone3_PlayFrequency
                onComplete={handleZone3Complete}
            />

            {/* ZONE 4: Play Partners - Character Gathering (Multi-select) */}
            <Zone4_PlayPartners
                onComplete={handleZone4Complete}
            />

            {/* ZONE 5: Games Owned - Trophy Collection Hall (Multi-select) */}
            <Zone5_GamesOwned
                onComplete={handleZone5Complete}
            />

            {/* ZONE 6: Location - World Map Floor Drive-Through */}
            <Zone6_Location
                onComplete={handleZone6Complete}
            />

            {/* ZONE 7: Age - Time Portal Rings */}
            <Zone7_Age
                onComplete={handleZone7Complete}
            />

            {/* Future zones (Zone 8+) - all zones render simultaneously for continuous flow */}
            {/* Positioned after Zone7 (which ends around -605) */}

            {/* Q1: Binary */}
            <BinaryQuestion
                position={[0, 0, -680]}
                question="Do you like the vibe?"
                onAnswer={handleAnswer}
            />

            {/* Q2: NPS (Bowling) */}
            <BowlingAlley
                position={[0, 0, -780]}
                question="Rate your ride!"
            />

            {/* Q3: Text (Drive Thru) */}
            <DriveThru
                position={[0, 0, -880]}
                question="Any feedback?"
                onAnswer={handleAnswer}
            />
        </>
    );
};

export default ZoneManager;
