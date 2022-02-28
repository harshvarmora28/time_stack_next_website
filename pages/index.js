import React, { useState, useEffect, useRef } from "react";
import Head from "next/head";
import Navbar from "../components/Navbar";
import Timer from "../components/Timer";
import About from "../components/About";
import Alarm from "../components/Alarm";
import ModalSetting from "../components/ModalSetting";

export default function index() {
  const [pomodoro, setPomodoro] = useState(20);
  const [shortBreak, setShortBreak] = useState(5);
  const [longBreak, setLongBreak] = useState(20);
  const [seconds, setSeconds] = useState(0);
  const [ticking, setTicking] = useState(false);
  const [consumedSecond, setConsumedSecond] = useState(0);
  const [isTimeUp, setIsTimeUp] = useState(false);

  const [openSetting, setOpenSetting] = useState(false);

  const [stage, setStage] = useState(0);

  const alarmRef = useRef();
  const pomodoroRef = useRef();
  const shortBreakRef = useRef();
  const longBreakRef = useRef();

  const switchStage = (index) => {
    const isYes =
      consumedSecond && stage !== index
        ? confirm("Are you sure you want to switch?")
        : false;

    if (isYes) {
      reset();
      setStage(index);
    } else if (!consumedSecond) {
      setStage(index);
    }
  };

  const getTickingTime = () => {
    const timeStage = {
      0: pomodoro,
      1: shortBreak,
      2: longBreak,
    };

    return timeStage[stage];
  };

  const updateMinute = () => {
    const updateStage = {
      0: setPomodoro,
      1: setShortBreak,
      2: setLongBreak,
    };

    return updateStage[stage];
  };

  const reset = () => {
    setConsumedSecond(0);
    setTicking(false);
    setSeconds(0);
    setPomodoro(20);
    setShortBreak(5);
    setLongBreak(20);
  };

  const timeUp = () => {
    reset();
    setIsTimeUp(true);

    // play alarm when times up
    alarmRef.current.play();
  };

  const clockTicking = () => {
    const minutes = getTickingTime();
    const setMinutes = updateMinute();

    if (minutes === 0 && seconds === 0) {
      timeUp();
    } else if (seconds === 0) {
      setMinutes((minute) => minute - 1);
      setSeconds(59);
    } else {
      setSeconds((seconds) => seconds - 1);
    }
  };

  const muteAlarm = () => {
    alarmRef.current.pause();
    alarmRef.current.currentTime = 0;
  };

  const startTimer = () => {
    setIsTimeUp(false);
    muteAlarm();
    setTicking((ticking) => !ticking);
  };

  useEffect(() => {
    window.onbeforeunload = () => {
      return consumedSecond ? "Show Warning" : null;
    };

    const timer = setInterval(() => {
      if (ticking) {
        setConsumedSecond((value) => value + 1);
        clockTicking();
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [seconds, pomodoro, shortBreak, longBreak, ticking]);

  return (
    <>
      <Head>
        <title>Time Stack - Pomodoro</title>
        <link rel="icon" href="time_stack_logo_without_text.png" />
      </Head>

      <div
        className="bg-gray-900 min-h-screen font-inter"
        style={{ backgroundColor: "#110026" }}
      >
        <div className="max-w-4xl min-h-screen mx-auto">
          <Navbar setOpenSetting={setOpenSetting} />
          <Timer
            stage={stage}
            switchStage={switchStage}
            getTickingTime={getTickingTime}
            seconds={seconds}
            ticking={ticking}
            startTimer={startTimer}
            muteAlarm={muteAlarm}
            isTimeUp={isTimeUp}
            reset={reset}
          />
          <About />
          <Alarm ref={alarmRef} />
          <ModalSetting
            openSetting={openSetting}
            setOpenSetting={setOpenSetting}
            pomodoroRef={pomodoroRef}
            shortBreakRef={shortBreakRef}
            longBreakRef={longBreakRef}
          />
        </div>
      </div>
    </>
  );
}
