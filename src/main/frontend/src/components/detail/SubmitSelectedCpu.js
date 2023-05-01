import React, {useEffect, useState} from "react";
import axios from "axios";
import ProgressBar from "react-bootstrap/ProgressBar";
import styles from "./detail.module.css";


function SubmitSelectedCpu({ selectedCpu, cpuInfo, cpuInfo2 }) {

    const [selectedCpuInfo, setSelectedCpuInfo] = useState([]);
    const [selectedCpuInfoDetail, setSelectedCpuInfoDetail] = useState([]);

    // selectedCpuInfo
    const [selectedCpuInfoPrice, setSelectedCpuInfoPrice] = useState(0);
    const [selectedCpuInfoValue, setSelectedCpuInfoValue] = useState(0);
    const [selectedCpuInfoMark, setSelectedCpuInfoMark] = useState(0);

    // cpuInfo
    const [cpuInfoPrice, setCpuInfoPrice] = useState(0);
    const [cpuInfoValue, setCpuInfoValue] = useState(0);
    const [cpuInfoMark, setCpuInfoMark] = useState(0);

    // selectedCpuInfoDetail
    const [selectedCpuInfoDetailClock, setSelectedCpuInfoDetailClock] = useState(0);
    const [selectedCpuInfoDetailTurbo, setSelectedCpuInfoDetailTurbo] = useState(0);
    const [selectedCpuInfoDetailCore, setSelectedCpuInfoDetailCore] = useState(0);

    // cpuInfoDetail
    const [cpuInfoDetailClock, setCpuInfoDetailClock] = useState(0);
    const [cpuInfoDetailTurbo, setCpuInfoDetailTurbo] = useState(0);
    const [cpuInfoDetailCore, setCpuInfoDetailCore] = useState(0);

    const [count, setCount] = useState(0);
    const [loading, setLoading] = useState(true);

    const CpuInfoProgressBar = (info1, info2) => {
        let a, b;
        a = info1/(info1 + info2) * 100;
        b = info2/(info1 + info2) * 100;
        a = Math.round(a);
        b = Math.round(b);

        return (
            <div>
                {a > 0 && b > 0 && !isNaN(a) && !isNaN(b) &&
                    <div>
                        <ProgressBar className={styles.progressBarCss}>
                            <ProgressBar animated variant="success" now={a} label={`${a}%(${info1})`} key={1} />
                            <ProgressBar animated variant="warning" now={b} label={`${b}%(${info2})`} key={2} />
                        </ProgressBar>
                    </div>
                }
            </div>
        );
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (selectedCpu) {
                    const nameResponse = await axios.post('/find_cpu_name', `${selectedCpu.label}`);
                    setSelectedCpuInfo(nameResponse.data);
                    if (selectedCpuInfo) {
                        changeSelectedCpuInfoToInt(nameResponse.data);
                    }
                    changeCpuInfoToInt(cpuInfo);
                    console.log(nameResponse.data);
                }

                if (selectedCpu) {
                    const detailResponse = await axios.post('/find_cpu_detail_name', `${selectedCpu.label}`);
                    setSelectedCpuInfoDetail(detailResponse.data);
                    if (selectedCpuInfoDetail) {
                        changeSelectedCpuInfoDetailToInt(detailResponse.data);
                    }
                    changeCpuInfoDetailToInt(cpuInfo2);
                    console.log(detailResponse.data);
                }

                setLoading(false);
            } catch (error) {
                console.log(error); // ????
            }
        };

        fetchData();
    }, [selectedCpu]);

    const changeSelectedCpuInfoToInt = (cpuInfoF) => {
        // cpuInfo.cpuPrice, cpuInfo.cpuValue
        const strPrice = cpuInfoF.cpuPrice;
        const strValue = cpuInfoF.cpuValue;
        const strMark = cpuInfoF.cpuMark;

        const intPrice = parseInt(strPrice);
        const intValue = parseInt(strValue);
        const intMark = parseInt(strMark);

        setSelectedCpuInfoPrice(intPrice);
        setSelectedCpuInfoValue(intValue);
        setSelectedCpuInfoMark(intMark);
    }

    const changeCpuInfoToInt = (cpuInfoF) => {
        // cpuInfo.cpuPrice, cpuInfo.cpuValue
        const strPrice = cpuInfoF.cpuPrice;
        const strValue = cpuInfoF.cpuValue;
        const strMark = cpuInfoF.cpuMark;

        const intPrice = parseInt(strPrice);
        const intValue = parseInt(strValue);
        const intMark = parseInt(strMark);

        setCpuInfoPrice(intPrice);
        setCpuInfoValue(intValue);
        setCpuInfoMark(intMark);
    }

    const changeSelectedCpuInfoDetailToInt = (cpuInfoDetailF) => {
        // cpuInfoDetail.clock, cpuInfoDetail.turbo, cpuInfoDetail.core
        let strClock2 = cpuInfoDetailF.clock;
        let strTurbo2 = cpuInfoDetailF.turbo;
        let strCore = cpuInfoDetailF.core;

        let strClock;
        let strTurbo;

        if(strClock2) {
            strClock = strClock2.split(' ')[0];
        }
        else {
            strClock = 0;
        }

        if(strTurbo2) {
            strTurbo = strTurbo2.split(' ')[0];
        }
        else {
            strTurbo = 0;
        }

        if(!strCore) {
            strCore = 0;
        }




        const intClock = parseFloat(strClock);
        const intTurbo = parseFloat(strTurbo);
        const intCore = parseInt(strCore);

        setSelectedCpuInfoDetailClock(intClock);
        setSelectedCpuInfoDetailTurbo(intTurbo);
        setSelectedCpuInfoDetailCore(intCore);
        console.log(intClock);
        console.log(intTurbo);
        console.log(intCore);
    }

    const changeCpuInfoDetailToInt = (cpuInfoDetailF) => {
        // cpuInfoDetail.clock, cpuInfoDetail.turbo, cpuInfoDetail.core
        let strClock2 = cpuInfoDetailF.clock;
        let strTurbo2 = cpuInfoDetailF.turbo;
        let strCore = cpuInfoDetailF.core;

        let strClock;
        let strTurbo;

        if(strClock2) {
            strClock = strClock2.split(' ')[0];
        }
        else {
            strClock = 0;
        }

        if(strTurbo2) {
            strTurbo = strTurbo2.split(' ')[0];
        }
        else {
            strTurbo = 0;
        }

        if(!strCore) {
            strCore = 0;
        }

        // const strClock = strClock2.split(' ')[0];
        // const strTurbo = strTurbo2.split(' ')[0];

        const intClock = parseFloat(strClock);
        const intTurbo = parseFloat(strTurbo);
        const intCore = parseInt(strCore);

        setCpuInfoDetailClock(intClock);
        setCpuInfoDetailTurbo(intTurbo);
        setCpuInfoDetailCore(intCore);
    }


    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            {/*{}*/}
            <div>
                {(cpuInfoMark > 0 && selectedCpuInfoMark > 0 && !isNaN(cpuInfoMark) && !isNaN(selectedCpuInfoMark)) &&
                    <div>
                        <label>Cpu BenchMark &nbsp;</label><br/>
                        {CpuInfoProgressBar(cpuInfoMark, selectedCpuInfoMark)}
                        <br/>
                    </div>
                }

                {(cpuInfoDetailClock > 0 && selectedCpuInfoDetailClock > 0 && !isNaN(cpuInfoDetailClock) && !isNaN(selectedCpuInfoDetailClock)) &&
                    <div>
                        <label>Cpu Clock Speed &nbsp;</label><br/>
                        {CpuInfoProgressBar(cpuInfoDetailClock, selectedCpuInfoDetailClock)}
                        <br/>
                    </div>
                }

                {(cpuInfoDetailTurbo > 0 && selectedCpuInfoDetailTurbo > 0 && !isNaN(cpuInfoDetailTurbo) && !isNaN(selectedCpuInfoDetailTurbo)) &&
                    <div>
                        <label>Cpu Turbo Speed &nbsp;</label><br/>
                        {CpuInfoProgressBar(cpuInfoDetailTurbo, selectedCpuInfoDetailTurbo)}
                        <br/>
                    </div>
                }

                {(cpuInfoDetailCore > 0 && selectedCpuInfoDetailCore > 0 && !isNaN(cpuInfoDetailCore) && !isNaN(selectedCpuInfoDetailCore)) &&
                    <div>
                        <label>Cpu Cores &nbsp;</label><br/>
                        {CpuInfoProgressBar(cpuInfoDetailCore, selectedCpuInfoDetailCore)}
                        <br/>
                    </div>
                }

                {(cpuInfoPrice > 0 && selectedCpuInfoPrice > 0 && !isNaN(cpuInfoPrice) && !isNaN(selectedCpuInfoPrice)) &&
                    <div>
                        <label>Cpu Price &nbsp;</label><br/>
                        {CpuInfoProgressBar(cpuInfoPrice, selectedCpuInfoPrice)}
                        <br/>
                    </div>
                }

                {(cpuInfoValue > 0 && selectedCpuInfoValue > 0 && !isNaN(cpuInfoValue) && !isNaN(selectedCpuInfoValue)) &&
                    <div>
                        <label>Cpu Value &nbsp;</label><br/>
                        {CpuInfoProgressBar(cpuInfoValue, selectedCpuInfoValue)}
                        <br/>
                    </div>
                }

            </div>
        </>
    );
}

export default SubmitSelectedCpu;