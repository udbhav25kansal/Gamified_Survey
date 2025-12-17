import React, { useState } from 'react';
import Zone0_Intro from './Zones/Zone0_Intro';
import Zone1_SourceTracking from './Zones/Zone1_SourceTracking';
import BinaryQuestion from './BinaryQuestion';
import BowlingAlley from './BowlingAlley';
import DriveThru from './DriveThru';

const ZoneManager = () => {
    const [currentZone, setCurrentZone] = useState(0);
    const [surveyData, setSurveyData] = useState({
        sourceTracking: null
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

    return (
        <>
            {/* ZONE 0: Welcome & Intro with Deca Bot */}
            {currentZone === 0 && (
                <Zone0_Intro
                    onComplete={handleZone0Complete}
                    videoUrl="/videos/deca-intro.mp4"
                />
            )}

            {/* ZONE 1: Source Tracking - How'd you find us? */}
            {currentZone >= 1 && (
                <Zone1_SourceTracking
                    onComplete={handleZone1Complete}
                />
            )}

            {/* Future zones (Zone 2+) will be rendered based on currentZone */}
            {currentZone >= 2 && (
                <>
                    {/* Q1: Binary */}
                    <BinaryQuestion
                        position={[0, 0, -80]}
                        question="Do you like the vibe?"
                        onAnswer={handleAnswer}
                    />

                    {/* Q2: NPS (Bowling) */}
                    <BowlingAlley
                        position={[0, 0, -120]}
                        question="Rate your ride!"
                    />

                    {/* Q3: Text (Drive Thru) */}
                    <DriveThru
                        position={[0, 0, -160]}
                        question="Any feedback?"
                        onAnswer={handleAnswer}
                    />
                </>
            )}
        </>
    );
};

export default ZoneManager;
