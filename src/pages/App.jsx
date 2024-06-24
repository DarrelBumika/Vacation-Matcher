import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid"

import logo from "../assets/logo.png"

function App() {

    // const tahap = ["Input Kriteria", "Input Alternatif", "Hasil Perhitungan"]
    const tahap= {
        "inputKriteria": {
            "title" : "Masukkan Kriteria",
            "num"   : 1
        }, 
        "inputAlternatif": {
            "title" :"Masukkan Tujuan Wisata",
            "num"   : 2
        }, 
        "hasilPerhitungan": {
            "title" : "Hasil Perhitungan",
            "num"   : 3,
            "sub"   : {
                "tampilInput"   : {
                    "title" : "Menampilkan Hasil Input Kriteria dan Alternatif",
                    "num"   : "A",
                },
                "normalisasi"   : {
                    "title" : "Menampilkan Hasil Normalisasi",
                    "num"   : "B",
                },
                "perhitunganNormalisasi"   : {
                    "title" : "Menampilkan Hasil Perhitungan Normalisasi",
                    "num"   : "C",
                },
                'ranking'   : {
                    "title" : "Menampilkan Hasil Ranking",
                    "num"   : "D",
                }
            }
        }
    }

    const [showMenu, setShowMenu] = useState(true)
    
    const handleShowMenu = () => {
        setShowMenu(true)
    }

    // ==============================================================================================================================================

    // Kriteria state & rander process
    const [kriteriaInputFields, setKriteriaInputFields] = useState(() => {
        const storedInput = JSON.parse(localStorage.getItem("kriteriaInputFields"));
        const defaultValue = [{ id: uuidv4(), namaKriteria: "", kodeKriteria: "", costBenefit: "Cost", nilaiBobot: "" }]
        return storedInput ? storedInput : defaultValue;
    })

    const [validKriteriaInputFields, setValidKriteriaInputFields] = useState(() => {
        const storedInput = JSON.parse(localStorage.getItem("validKriteriaInputFields"));
        return storedInput ? storedInput : [];
    })

    const kriteriaInputFieldCheck = (e) => {
        if(
            e.namaKriteria !== "" &&
            e.kodeKriteria !== "" &&
            e.nilaiBobot !== ""
        ) {
            return true;
        }
        return false;
    }

    useEffect(() => {
        localStorage.setItem("kriteriaInputFields", JSON.stringify(kriteriaInputFields))

        var sementara = [];
        for(var i = 0; i < kriteriaInputFields.length; i++) {
            if(kriteriaInputFieldCheck(kriteriaInputFields[i])) {
                sementara = [...sementara, kriteriaInputFields[i]];
            }
        }
        localStorage.setItem("validKriteriaInputFields", JSON.stringify(sementara));
        setValidKriteriaInputFields(sementara)
    }, [kriteriaInputFields])

    // Kriteria form handlers
    const handleChangeKriteriaFormFields = (id, e) => {
        const newInputFields = kriteriaInputFields.map(i => {
            if(id === i.id) {
                var value = e.target.value;
                if(e.target.name === "nilaiBobot") {
                    value = parseFloat(value)
                }
                i[e.target.name] = e.target.value
            }
            return i;
        })
        setKriteriaInputFields(newInputFields);
    }
        
    const handleAddKriteriaFormFields = () => {
        setKriteriaInputFields([...kriteriaInputFields, { id: uuidv4(), namaKriteria: "", kodeKriteria: "", costBenefit:"Cost", nilaiBobot: "" }])
    }
    
    const handleRemoveKriteriaFormFields = (id) => {
        const values  = [...kriteriaInputFields];
        values.splice(values.findIndex(value => value.id === id), 1);
        setKriteriaInputFields(values);
    }

    const handleClearKriteriaFormFields = () => {
        setKriteriaInputFields([{ id: uuidv4(), namaKriteria: "", kodeKriteria: "", costBenefit:"Cost", nilaiBobot: "" }])
    }
    
    // ==============================================================================================================================================

    // Alternatif state & render process
    function generateDefaultValue() {
        const currentDefaultValue = { id : uuidv4(), namaAlternatif: "" };
        if(validKriteriaInputFields) {
            for(var i = 0; i < validKriteriaInputFields.length; i++) {
                Object.assign(currentDefaultValue, { [validKriteriaInputFields[i].kodeKriteria]: ""})
            }
        }
        return currentDefaultValue
    }

    const [alternatifDefaultValue, setAlternatifDefaultValue] = useState(() => {  
        return generateDefaultValue()
    })

    const [alternatifInputFields, setAlternatifInputFields] = useState(() => {
        const storedInput = JSON.parse(localStorage.getItem("alternatifInputFields"));
        return storedInput ? storedInput : [alternatifDefaultValue];
    })

    const [validAlternatifInputFields, setValidAlternatifInputFields] = useState(() => {
        const storedInput = JSON.parse(localStorage.getItem("validAlternatifInputFields"))
        return storedInput ? storedInput : [];
    })

    const alternatifInputFieldCheck = (e) => {
        if (e.namaAlternatif === "") {
            return false
        }
        for(var i = 0; i < validKriteriaInputFields.length; i++) {
            if (e[validKriteriaInputFields[i].kodeKriteria] === "") {
                return false
            }
        }
        return true
    }

    useEffect(() => {
        localStorage.setItem("alternatifInputFields", JSON.stringify(alternatifInputFields))

        var sementara = [];
        for(var i = 0; i < alternatifInputFields.length; i++) {
            if(alternatifInputFieldCheck(alternatifInputFields[i])) {
                sementara = [...sementara, alternatifInputFields[i]];
            }
        }
        
        setValidAlternatifInputFields(sementara)
        validKriteriaInputFields.length === 0 ? localStorage.setItem("validAlternatifInputFields", JSON.stringify([])) : localStorage.setItem("validAlternatifInputFields", JSON.stringify(sementara));
    }, [alternatifInputFields])

    useEffect(() => {
        setAlternatifDefaultValue(generateDefaultValue);
        validKriteriaInputFields.length === 0 ? setAlternatifInputFields([alternatifDefaultValue]) : null;
    }, [validKriteriaInputFields])

    useEffect(() => {
        const newInputFields = alternatifInputFields.map((alternatifInput) => {
            const newInputProperties = {};
            for(const [key] of Object.entries(alternatifDefaultValue)) {
                alternatifInput[key] ? Object.assign(newInputProperties, {[key]: alternatifInput[key]}) : Object.assign(newInputProperties, {[key]: ""}) 
            }
            return newInputProperties;
        })
        setAlternatifInputFields(newInputFields);
    }, [alternatifDefaultValue])

    // Alternatif form handlers
    const handleChangeAlternatifFormFields = (id, e) => {
        const newInputFields = alternatifInputFields.map(i => {
            if(id === i.id) {
                i[e.target.name] = e.target.value
            }
            return i;
        })
        setAlternatifInputFields(newInputFields);
    }
        
    const handleAddAlternatifFormFields = () => {
        setAlternatifInputFields([...alternatifInputFields, generateDefaultValue()])
    }
    
    const handleRemoveAlternatifFormFields = (id) => {
        const values  = [...alternatifInputFields];
        values.splice(values.findIndex(value => value.id === id), 1);
        setAlternatifInputFields(values);
    }

    const handleClearAlternatifFormFields = () => {
        setAlternatifInputFields([{ id: uuidv4(), namaAlternatif: "" }])
    }

    // ======================================================================================================================================== 
    // PROSES

    const [minMax, setMinMax] = useState([...validKriteriaInputFields])
    const [normalize, setNormalize] = useState([...validAlternatifInputFields])
    const [calculatedNormalize, setCalculatedNormalize] = useState([...normalize])

    useEffect(() => {
        setMinMax(
            validKriteriaInputFields.map(kriteria => {
                const a = validAlternatifInputFields.map(alternatif => (
                    parseInt(alternatif[kriteria.kodeKriteria])
                ))
                const obj = kriteria
                kriteria.costBenefit === "Cost" ? Object.assign(obj, {"minMax": Math.min(...a)}) : Object.assign(obj, {"minMax": Math.max(...a)}) 
                return obj
            })
        )

        setNormalize(() => (
            validAlternatifInputFields.map(alternatif => {
                const obj = { "id": alternatif.id, "namaAlternatif": alternatif.namaAlternatif }
                minMax.map(kriteria => {
                    const normalized = kriteria.costBenefit === "Cost" ? kriteria.minMax / parseInt(alternatif[kriteria.kodeKriteria]) : parseInt(alternatif[kriteria.kodeKriteria]) / kriteria.minMax
                    Object.defineProperty(obj, kriteria.kodeKriteria, {value: normalized.toFixed(2)})
                })
                return obj
            })
        ))
    }, [validAlternatifInputFields])

    useEffect(() => {
        setCalculatedNormalize(() => (
            normalize.map(alternatif => {
                const obj = { "id": alternatif.id, "namaAlternatif": alternatif.namaAlternatif }
                let total = 0
                validKriteriaInputFields.map(kriteria => {
                    const calculated = parseInt(kriteria.nilaiBobot)*alternatif[kriteria.kodeKriteria]
                    Object.defineProperty(obj, kriteria.kodeKriteria, {value: calculated.toFixed(2)})
                    total += calculated
                })
                Object.defineProperty(obj, "total", {value: total.toFixed(2)})
                return obj
            })
        ))
    }, [normalize])

    // Ranking System

    const [ranking, setRanking] = useState([...calculatedNormalize])

    const compare = (a, b) => parseFloat(a.total) < parseFloat(b.total)

    useEffect(() => {
        setRanking(() => {
            var rank = [...calculatedNormalize]
            for(var i = 0; i < rank.length - 1; i++) {
                for(var j = 0; j < rank.length - 1 - i; j++) {
                    console.log(rank[j])
                    if(compare(rank[j], rank[j + 1])) {
                        let temp = rank[j]
                        rank[j] = rank[j + 1]
                        rank[j + 1] =  temp
                    }
                }
            }
            return rank
        })
        
    }, [calculatedNormalize])

    return(
        <div className="flex flex-col">
            <div className="w-full flex justify-center items-center sticky top-0 z-50 bg-white">
                <div className="w-full flex justify-center items-center py-5 gap-3 border-b-2 border-primary-surface">
                    {/* <p className="flex font-poppins font-bold text-2xl">User's</p>
                    <p className="font-poppins font-extrabold text-6xl">Summer</p>
                    <p className="font-poppins font-bold text-2xl text-primary-main">vacation</p> */}
                    <img src={logo} alt="logo" className="w-[500px] py-5"/>
                </div>
            </div>

            <div className="flex py-10 justify-center">

                <div className="flex justify-center gap-10">

                    {
                        showMenu ? (
                            <>
                            <div className="w-[300px] gap-5 h-fit flex flex-col top-[142px] sticky">
                                <div className="font-poppins font-bold text-5xl">Proses</div>
                                <div className="flex flex-col gap-1">
                                    {
                                        Object.entries(tahap).map(element => (
                                            <div className="bg-primary-surface border-l-2 border-primary-light hover:border-l-4 hover:border-primary-main" key={element[0]}>
                                                <a className="w-full h-10 flex items-center pl-5" href={"#"+element[0]}>
                                                    <p className="font-poppins font-medium text-xl text-primary-main">{element[1]["title"]}</p>
                                                </a>
                                                {
                                                    element[1]["sub"] ? (
                                                        <div className="flex flex-col pt-2">
                                                            {
                                                                Object.entries(element[1]["sub"]).map(sub => (
                                                                    <a className="w-full h-10 flex items-center pl-10 hover:border-l-2 hover:border-primary-main" href={"#"+sub[0]} key={sub[0]}>
                                                                        <p className="font-poppins font-medium text-sm text-primary-main">{sub[1]["title"]}</p>
                                                                    </a>
                                                                ))
                                                            }
                                                        </div>
                                                    ) : null
                                                }
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>

                            <div className="w-[2px] flex bg-primary-surface"></div>
                            </>
                        ) : null
                    }

                    <div className="w-[1200px] flex flex-col gap-10">

                        {/* Tahap 1 */}
                        <div className="flex flex-col gap-10" id={Object.keys(tahap)[0]}>

                            <div className="flex gap-10">
                                <div className="min-w-20 h-20 flex justify-center items-center bg-primary-main rounded-3xl font-poppins font-bold text-white text-3xl">1</div>
                                <div className="flex flex-col gap-5">
                                    <div className="flex items-center font-poppins font-bold text-5xl">{Object.values(tahap)[0]["title"]}</div>
                                    <p className="font-poppins font-normal text-base text-justify">
                                        Masukkan kriteria yang anda perimbangkan dalam memilih tempat 
                                        wisata pada kolom <span className="text-primary-main font-semibold">nama kriteria</span>. Anda dapat mempertimbangkan berbagai hal 
                                        seperti harga tiket masuk, bintang hotel, serta rating dan ulasan tempat wisata. 
                                        Pililah <span className="text-primary-main font-semibold">benefit</span> apabila semakin tinggi nilai kriteria tersebut akan semakin 
                                        menguntungkan anda, dan pilihlah <span className="text-primary-main font-semibold">cost</span> apabila semakin tinggi nilai dari 
                                        kriteria tersebut akan semakin mengurungkan minat anda terhadap tempat wisata. Terakhir, 
                                        tentukan <span className="text-primary-main font-semibold">bobot</span> dari kriteria yang anda tuliskan dalam format bilangan bulat. 
                                        Ingatlah bahwa <span className="text-primary-main font-semibold">semakin tinggi bobot kriteria, berarti semakin penting kriteria tersebut </span> 
                                        dalam perhitungan ini.
                                    </p>
                                </div>
                            </div>

                            <div className="h-full flex flex-col gap-5">
                                <div className="bg-primary-surface rounded-lg overflow-hidden">
                                    <div className="flex gap-2 mx-12 bg-white">
                                        <p className="w-[40%] h-10 flex items-center justify-center font-poppins bg-primary-surface font-semibold text-primary-main text-center">Nama Kriteria</p>
                                        <p className="w-[20%] h-10 flex items-center justify-center font-poppins bg-primary-surface font-semibold text-primary-main text-center">Kode Kriteria</p>
                                        <p className="w-[20%] h-10 flex items-center justify-center font-poppins bg-primary-surface font-semibold text-primary-main text-center">Cost/Benefit</p>
                                        <p className="w-[20%] h-10 flex items-center justify-center font-poppins bg-primary-surface font-semibold text-primary-main text-center">Nilai Bobot</p>
                                    </div>
                                </div>
                                <form className="flex flex-col gap-5">
                                    <div className="flex flex-col gap-5">
                                        {
                                            kriteriaInputFields.map(kriteriaInputField => (
                                                <div className="flex gap-2"  key={kriteriaInputField.id}>
                                                    <div className="min-w-10 h-10 flex gap-1 justify-center items-center">
                                                        <div className="flex flex-col gap-1">
                                                            <div className="w-1 h-1 rounded-full bg-primary-main" />
                                                            <div className="w-1 h-1 rounded-full bg-primary-main" />
                                                            <div className="w-1 h-1 rounded-full bg-primary-main" />
                                                        </div>
                                                        <div className="flex flex-col gap-1">
                                                            <div className="w-1 h-1 rounded-full bg-primary-main" />
                                                            <div className="w-1 h-1 rounded-full bg-primary-main" />
                                                            <div className="w-1 h-1 rounded-full bg-primary-main" />
                                                        </div>
                                                    </div>
                                                    <div className="w-full flex gap-2">
                                                        <input type="text" name="namaKriteria" className="w-[40%] h-10 p-2 rounded-lg border border-primary-main font-poppins font-normal" defaultValue={kriteriaInputField.namaKriteria} placeholder="Nama Kriteria" onChange={e => handleChangeKriteriaFormFields(kriteriaInputField.id, e)} />
                                                        <input type="text" name="kodeKriteria" className="w-[20%] h-10 p-2 rounded-lg border border-primary-main font-poppins font-normal" defaultValue={kriteriaInputField.kodeKriteria} placeholder="Kode Kriteria" onChange={e => handleChangeKriteriaFormFields(kriteriaInputField.id, e)} />
                                                        <select name="costBenefit" className="w-[20%] h-10 p-2 rounded-lg bg-primary-main font-poppins font-normal text-white cursor-pointer" defaultValue={kriteriaInputField.costBenefit} onChange={e => handleChangeKriteriaFormFields(kriteriaInputField.id, e)} >
                                                            <option value="Cost">Cost</option>
                                                            <option value="Benefit">Benefit</option>
                                                        </select>
                                                        <input type="text" name="nilaiBobot" className="w-[20%] h-10 p-2 rounded-lg border border-primary-main font-poppins font-normal" defaultValue={kriteriaInputField.nilaiBobot} placeholder="Nilai Bobot" onChange={e => handleChangeKriteriaFormFields(kriteriaInputField.id, e)} />
                                                    </div>
                                                    <button className="min-w-10 h-10 flex gap-1 justify-center items-center rounded-lg bg-primary-main" onClick={() => kriteriaInputFields.length === 1 ? handleClearKriteriaFormFields() : handleRemoveKriteriaFormFields(kriteriaInputField.id)}>
                                                        <div className="font-poppins font-bold text-white">X</div>
                                                    </button>
                                                </div>
                                            ))
                                        }
                                    </div>
                                    <div className="flex gap-5">
                                        <button 
                                            type="button"
                                            disabled={kriteriaInputFields.length === 10}
                                            onClick={() => handleAddKriteriaFormFields()}
                                            className={"w-full h-10 rounded-lg overflow-hidden font-poppins font-semibold text-xl text-white "+(kriteriaInputFields.length === 10 ? "bg-primary-surface" : "bg-primary-light")}
                                        >
                                            Add
                                        </button>
                                        <button
                                            type="button"
                                            disabled={!validKriteriaInputFields}
                                            onClick={() => handleClearKriteriaFormFields()}
                                            className="w-40 h-10 rounded-lg overflow-hidden font-poppins font-semibold text-xl text-white bg-primary-main"
                                        >
                                            Clear
                                        </button>
                                    </div>
                                    
                                </form>
                            </div>
                        </div>

                        <div className="w-full h-[2px] bg-primary-surface rounded-full"></div>

                        {/* Tahap 2 */}
                        <div className="flex flex-col gap-10" id={Object.keys(tahap)[1]}>
                            <div className="flex gap-10">
                                <div className="min-w-20 h-20 flex justify-center items-center bg-primary-main rounded-3xl font-poppins font-bold text-white text-3xl">2</div>
                                <div className="flex flex-col gap-5">
                                    <div className="flex items-center font-poppins font-bold text-5xl">{Object.values(tahap)[1]["title"]}</div>
                                    <p className="font-poppins font-normal text-base text-justify">
                                        Tentukan wisata mana saja yang ingin anda datangi. Nilailah 
                                        tempat tersebut berdasarkan kriteria-kriteria penilaian yang anda berikan pada tahap sebelumnya. Pastikan format penilaian yang anda 
                                        berikan menggunakan <span className="text-primary-main font-semibold">bilangan bulat</span>.
                                    </p>
                                </div>
                            </div>
                            {
                                validKriteriaInputFields.length == 0 ? (
                                    <div className="h-10 flex justify-center items-center bg-red-300 rounded-lg">
                                        <p className="font-poppins font-semibold text-red-700">Masukkan setidaknya satu kriteria dengan data yang langkap pada 
                                            tahap <span className="font-bold underline"><a href={"#"+Object.keys(tahap)[0]}>input kriteria</a></span>
                                        </p>
                                    </div>
                                ) : (
                                    <div className="w-auto h-full flex flex-col gap-5">
                                        <div className="bg-primary-surface rounded-lg overflow-hidden">
                                            <div className="h-10 flex gap-2 mx-12 bg-white">
                                                <p className="w-[144px] flex justify-center items-center grow-[3] font-poppins font-semibold text-primary-main bg-primary-surface text-center">Nama Kriteria</p>
                                                {
                                                    validKriteriaInputFields.map(kriteriaInputField => (
                                                        <p className="w-[50px] flex justify-center items-center grow font-poppins font-semibold text-primary-main bg-primary-surface text-center" key={kriteriaInputField.id}>{kriteriaInputField.kodeKriteria}</p>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                        <form className="flex flex-col gap-5">
                                            <div className="flex flex-col gap-5">
                                                {
                                                    alternatifInputFields.map(alternatifInputField => (
                                                        <div className="flex gap-2" key={alternatifInputField.id}>
                                                            <div className="flex">
                                                                <div className="flex w-10 h-10 gap-1 justify-center items-center">
                                                                    <div className="flex flex-col gap-1">
                                                                        <div className="w-1 h-1 rounded-full bg-primary-main" />
                                                                        <div className="w-1 h-1 rounded-full bg-primary-main" />
                                                                        <div className="w-1 h-1 rounded-full bg-primary-main" />
                                                                    </div>
                                                                    <div className="flex flex-col gap-1">
                                                                        <div className="w-1 h-1 rounded-full bg-primary-main" />
                                                                        <div className="w-1 h-1 rounded-full bg-primary-main" />
                                                                        <div className="w-1 h-1 rounded-full bg-primary-main" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <input type="text" name="namaAlternatif" className="h-10 p-2 grow-[3] rounded-lg border border-primary-main font-poppins font-normal w-[144px]" defaultValue={alternatifInputField.namaAlternatif} placeholder="Nama Alternatif" onChange={e => handleChangeAlternatifFormFields(alternatifInputField.id, e)} />
                                                            {
                                                                validKriteriaInputFields.map(kriteriaInputField => (
                                                                    <input key={kriteriaInputField.id} type="text" name={kriteriaInputField.kodeKriteria} className="w-[50px] h-10 p-2 grow rounded-lg border border-primary-main font-poppins font-normal" defaultValue={alternatifInputField[kriteriaInputField.kodeKriteria]} placeholder="Nilai" onChange={e => handleChangeAlternatifFormFields(alternatifInputField.id, e)} />
                                                                ))
                                                            }
                                                            <button className="w-10 h-10 flex gap-1 justify-center items-center rounded-lg bg-primary-main" disabled={alternatifInputFields.length === 1} onClick={() => handleRemoveAlternatifFormFields(alternatifInputField.id)}>
                                                                <div className="font-poppins font-bold text-white">X</div>
                                                            </button>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                            <div className="flex gap-5">
                                                <button 
                                                    type="button"
                                                    disabled={alternatifInputFields.length === 10}
                                                    onClick={() => handleAddAlternatifFormFields()}
                                                    className={"w-full h-10 rounded-lg overflow-hidden font-poppins font-semibold text-xl text-white "+(alternatifInputFields.length === 10 ? "bg-primary-surface" : "bg-primary-light")}
                                                >
                                                    Add
                                                </button>
                                                <button
                                                    type="button"
                                                    disabled={!alternatifInputFields}
                                                    onClick={() => handleClearAlternatifFormFields()}
                                                    className={"w-40 h-10 rounded-lg overflow-hidden font-poppins font-semibold text-xl text-white "+(!alternatifInputFields ? "bg-primary-surface" : "bg-primary-main")}
                                                >
                                                    Clear
                                                </button>
                                            </div>
                                            
                                        </form>
                                    </div>
                                )
                            }
                            
                        </div>

                        <div className="w-full h-[2px] bg-primary-surface rounded-full"></div>

                        {/* Tahap 3 */}
                        <div className="flex flex-col gap-10" id={Object.keys(tahap)[2]}>
                            <div className="flex gap-10">
                                <div className="min-w-20 h-20 flex justify-center items-center bg-primary-main rounded-3xl font-poppins font-bold text-white text-3xl">3</div>
                                <div className="flex flex-col gap-5">
                                    <div className="flex items-center font-poppins font-bold text-5xl">{Object.values(tahap)[2]["title"]}</div>
                                    <p className="font-poppins font-normal text-base text-justify">
                                        Di bawah ini adalah <span className="text-primary-main font-semibold">hasil perhitungan</span> tempat wisata berdasarkan kriteria-kriteria dan 
                                        nilai yang anda berikan terhadap tempat wisata tersebut. Hasil penilaian yang diberikan telah diurutkan dengan urutan teratas adalah tempat 
                                        wisata dengan nilai paling tinggi dan paling direkomendasikan untuk anda kunjungi. 
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-col gap-5">
                                {
                                    validKriteriaInputFields.length === 0 ? 
                                    (
                                        <div className="h-16 flex justify-center items-center bg-red-300 rounded-lg">
                                            <p className="font-poppins font-semibold text-red-700 text-center">Masukkan setidaknya satu kriteria dan satu alternatif dengan data yang langkap <br /> pada 
                                                tahap <span className="font-bold underline"><a href={"#"+Object.keys(tahap)[0]}>input kriteria</a></span> dan
                                                tahap <span className="font-bold underline"><a href={"#"+Object.keys(tahap)[1]}>input alternatif</a></span>
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="w-full flex flex-col justify-center gap-5">
                                            <div className="flex flex-col gap-5" id={Object.keys(Object.values(tahap)[2]["sub"])[0]}>
                                                <div className="pl-5 font-poppins font-semibold text-xl text-black">
                                                    {`${Object.values(Object.values(tahap)[2]["sub"])[0]["num"]}. ${Object.values(Object.values(tahap)[2]["sub"])[0]["title"]}`}
                                                </div>
                                                <div className="w-full flex flex-col gap-2">
                                                    <div className="h-10 rounded-lg overflow-hidden">
                                                        <div className="h-full flex bg-white gap-2">
                                                            <div className="min-w-10 h-full flex justify-center items-center font-poppins font-semibold text-base text-white bg-primary-main">No.</div>
                                                            <div className="w-[40%] h-full flex justify-center items-center font-poppins font-semibold text-base text-white bg-primary-main">Nama Kriteria</div>
                                                            <div className="w-[20%] h-full flex justify-center items-center font-poppins font-semibold text-base text-white bg-primary-main">Kode Kriteria</div>
                                                            <div className="w-[20%] h-full flex justify-center items-center font-poppins font-semibold text-base text-white bg-primary-main">Cost/Benefit</div>
                                                            <div className="w-[20%] h-full flex justify-center items-center font-poppins font-semibold text-base text-white bg-primary-main">Nilai Bobot</div>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col rounded-lg border border-primary-surface overflow-hidden">
                                                        {
                                                            validKriteriaInputFields.map((element, index) => (
                                                                <div className={`h-10 flex gap-2 bg-${index % 2 == 0 ? 'primary-surface' : 'white'}`} key={element.id}>
                                                                    <div className="min-w-10 h-full flex justify-center items-center font-poppins font-semibold text-base text-primary-main ">{index+1}</div>
                                                                    <div className="w-full flex gap-2">
                                                                        <div className="w-[40%] h-full flex justify-center items-center font-poppins font-semibold text-base text-primary-main ">{element.namaKriteria}</div>
                                                                        <div className="w-[20%] h-full flex justify-center items-center font-poppins font-semibold text-base text-primary-main ">{element.kodeKriteria}</div>
                                                                        <div className="w-[20%] h-full flex justify-center items-center font-poppins font-semibold text-base text-primary-main ">{element.costBenefit}</div>
                                                                        <div className="w-[20%] h-full flex justify-center items-center font-poppins font-semibold text-base text-primary-main ">{element.nilaiBobot}</div>
                                                                    </div>
                                                                </div>
                                                            ))
                                                        }
                                                    </div>
                                                    <div className="flex justify-center font-poppins font-semibold text-base">
                                                        Tabel 1. Tabel Kriteria
                                                    </div>
                                                </div>
                                            </div>

                                            {
                                                validAlternatifInputFields.length === 0 ? (
                                                    <div className="h-10 flex justify-center items-center bg-red-300 rounded-lg">
                                                        <p className="font-poppins font-semibold text-red-700 text-center">Masukkan setidaknya satu alternatif dengan data yang langkap pada 
                                                            tahap <span className="font-bold underline"><a href={"#"+Object.keys(tahap)[1]}>input alternatif</a></span>
                                                        </p>
                                                    </div>
                                                ) : (
                                                    <div className="flex flex-col gap-5" id={`#${Object.keys(Object.values(tahap)[2]["sub"])[1]}`}>
                                                        <div className="w-full flex flex-col gap-2">
                                                            <div className="h-10 rounded-lg overflow-hidden">
                                                                <div className="h-full flex bg-white gap-2">
                                                                    <div className="w-10 h-full flex justify-center items-center font-poppins font-semibold text-base text-white bg-primary-main">No.</div>
                                                                    <div className="w-[100px] grow h-full flex justify-center items-center font-poppins font-semibold text-base text-white bg-primary-main">Nama Alternatif</div>
                                                                    {
                                                                        validKriteriaInputFields.map(element => (
                                                                            <div className="w-[75px] h-full flex justify-center items-center font-poppins font-semibold text-base text-white bg-primary-main" key={element.id}>{element.kodeKriteria}</div>
                                                                        ))
                                                                    }
                                                                </div>
                                                            </div>
                                                            <div className="rounded-lg border border-primary-surface overflow-hidden">
                                                                {
                                                                    validAlternatifInputFields.map((element, index) => (
                                                                        <div className={`h-10 flex gap-2 bg-${index % 2 == 0 ? 'primary-surface' : 'white'}`} key={element.id}>
                                                                            <div className="w-10 h-full flex justify-center items-center font-poppins font-semibold text-base text-primary-main ">{index+1}</div>
                                                                            <div className="w-[100px] grow h-full flex justify-center items-center font-poppins font-semibold text-base text-primary-main">{element.namaAlternatif}</div>
                                                                            {
                                                                                validKriteriaInputFields.map(kriteria => (
                                                                                    <div className="w-[75px] h-full flex justify-center items-center font-poppins font-semibold text-base text-primary-main" key={kriteria.id}>{element[kriteria.kodeKriteria]}</div>
                                                                                ))
                                                                            }
                                                                        </div>
                                                                    ))
                                                                }
                                                            </div>
                                                            <div className="h-10 rounded-lg overflow-hidden">
                                                                <div className="h-full flex bg-primary-main gap-2">
                                                                    <div className="w-[148px] grow-[3] h-full flex justify-center items-center font-poppins font-semibold text-base text-white">Min / Max</div>
                                                                    {
                                                                        minMax.map((element, index) => (
                                                                            <div className="w-[75px] h-full flex justify-center items-center font-poppins font-semibold text-base text-white" key={index}>{element.minMax}</div>
                                                                        ))
                                                                    }
                                                                </div>
                                                            </div>
                                                            <div className="flex justify-center font-poppins font-semibold text-base">
                                                                Tabel 2. Tabel Alternatif
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        </div>
                                    )
                                }
                                {
                                    validKriteriaInputFields.length === 0 || validAlternatifInputFields.length === 0 ? 
                                    (
                                        null
                                    ) : (
                                        <>
                                            <div className="flex flex-col gap-5" id={Object.keys(Object.values(tahap)[2]["sub"])[2]}>
                                                <div className="pl-5 font-poppins font-semibold text-xl text-black">
                                                    {`${Object.values(Object.values(tahap)[2]["sub"])[1]["num"]}. ${Object.values(Object.values(tahap)[2]["sub"])[1]["title"]}`}
                                                </div>
                                                <div className="w-full flex flex-col gap-2">
                                                    <div className="h-10 rounded-lg overflow-hidden">
                                                        <div className="h-full flex bg-white gap-2">
                                                            <div className="w-10 h-full flex justify-center items-center font-poppins font-semibold text-base text-white bg-primary-main">No.</div>
                                                            <div className="w-[100px] grow h-full flex justify-center items-center font-poppins font-semibold text-base text-white bg-primary-main">Nama Alternatif</div>
                                                            {
                                                                validKriteriaInputFields.map(element => (
                                                                    <div className="w-[75px] h-full flex justify-center items-center font-poppins font-semibold text-base text-white bg-primary-main" key={element.id}>{element.kodeKriteria}</div>
                                                                ))
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className="rounded-lg border border-primary-surface overflow-hidden">
                                                        {
                                                            normalize.map((element, index) => (
                                                                <div className={`h-10 flex gap-2 bg-${index % 2 == 0 ? 'primary-surface' : 'white'}`} key={element.id}>
                                                                    <div className="w-10 h-full flex justify-center items-center font-poppins font-semibold text-base text-primary-main ">{index+1}</div>
                                                                    <div className="w-[100px] grow h-full flex justify-center items-center font-poppins font-semibold text-base text-primary-main">{element.namaAlternatif}</div>
                                                                    {
                                                                        validKriteriaInputFields.map(kriteria => (
                                                                            <div className="w-[75px] h-full flex justify-center items-center font-poppins font-semibold text-base text-primary-main" key={kriteria.id}>{element[kriteria.kodeKriteria]}</div>
                                                                        ))
                                                                    }
                                                                </div>
                                                            ))
                                                        }
                                                    </div>
                                                    <div className="flex justify-center font-poppins font-semibold text-base">
                                                        Tabel 3. Tabel Normalisasi
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex flex-col gap-5" id={Object.keys(Object.values(tahap)[2]["sub"])[3]}>
                                                <div className="pl-5 font-poppins font-semibold text-xl text-black">
                                                    {`${Object.values(Object.values(tahap)[2]["sub"])[2]["num"]}. ${Object.values(Object.values(tahap)[2]["sub"])[2]["title"]}`}
                                                </div>
                                                <div className="w-full flex flex-col gap-2">
                                                    <div className="flex gap-2">
                                                        <div className="flex flex-col grow gap-2">
                                                            <div className="h-10 rounded-lg overflow-hidden">
                                                                <div className="h-full flex bg-white gap-2">
                                                                    <div className="w-10 h-full flex justify-center items-center font-poppins font-semibold text-base text-white bg-primary-main">No.</div>
                                                                    <div className="w-[100px] grow h-full flex justify-center items-center font-poppins font-semibold text-base text-white bg-primary-main">Nama Alternatif</div>
                                                                    {
                                                                        validKriteriaInputFields.map(element => (
                                                                            <div className="w-[75px] h-full flex justify-center items-center font-poppins font-semibold text-base text-white bg-primary-main" key={element.id}>{element.kodeKriteria}</div>
                                                                        ))
                                                                    }
                                                                </div>
                                                            </div>
                                                            <div className="rounded-lg border border-primary-surface overflow-hidden">
                                                                {
                                                                    calculatedNormalize.map((element, index) => (
                                                                        <div className={`h-10 flex gap-2 bg-${index % 2 == 0 ? 'primary-surface' : 'white'}`} key={element.id}>
                                                                            <div className="w-10 h-full flex justify-center items-center font-poppins font-semibold text-base text-primary-main ">{index+1}</div>
                                                                            <div className="w-[100px] grow h-full flex justify-center items-center font-poppins font-semibold text-base text-primary-main">{element.namaAlternatif}</div>
                                                                            {
                                                                                validKriteriaInputFields.map(kriteria => (
                                                                                    <div className="w-[75px] h-full flex justify-center items-center font-poppins font-semibold text-base text-primary-main" key={kriteria.id}>{element[kriteria.kodeKriteria]}</div>
                                                                                ))
                                                                            }
                                                                        </div>
                                                                    ))
                                                                }
                                                            </div>
                                                        </div>
                                                        <div className="min-w-[100px] flex flex-col gap-2">
                                                            <div className="w-full h-10 flex justify-center items-center rounded-lg overflow-hidden font-poppins font-semibold text-base text-white bg-primary-main">Total</div>
                                                            <div className="rounded-lg border border-primary-surface overflow-hidden">
                                                                {
                                                                    calculatedNormalize.map((element, index) => (
                                                                        <div className={`h-10 flex justify-center items-center font-poppins font-semibold text-base text-primary-main gap-2 bg-${index % 2 == 0 ? 'primary-surface' : 'white'}`} key={element.id}>{element.total}</div>
                                                                    ))
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="flex justify-center font-poppins font-semibold text-base">
                                                        Tabel 4. Tabel Perhitungan
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex flex-col gap-5">
                                                <div className="pl-5 font-poppins font-semibold text-xl text-black">
                                                    {`${Object.values(Object.values(tahap)[2]["sub"])[3]["num"]}. ${Object.values(Object.values(tahap)[2]["sub"])[3]["title"]}`}
                                                </div>
                                                <div className="flex flex-col justify-center items-center gap-2">
                                                    <div className="flex gap-2 w-[100px] items-center -translate-x-20">
                                                        <div className="font-poppins font-extrabold text-7xl text-primary-main">01</div>
                                                        <div className="flex flex-col">
                                                            <div className="font-poppins font-bold text-2xl text-primary-main">{ranking[0].namaAlternatif}</div>
                                                            <div className="flex gap-2 font-poppins font-semibold text-base text-black">Score: <span className="text-primary-main">{ranking[0].total}</span></div>
                                                        </div>
                                                    </div>
                                                    <div className="flex gap-2 w-[100px] items-center">
                                                        <div className="font-poppins font-extrabold text-7xl text-primary-main">02</div>
                                                        <div className="flex flex-col">
                                                            <div className="font-poppins font-bold text-2xl text-primary-main">{ranking[1].namaAlternatif}</div>
                                                            <div className="flex gap-2 font-poppins font-semibold text-base text-black">Score: <span className="text-primary-main">{ranking[1].total}</span></div>
                                                        </div>
                                                    </div>
                                                    <div className="flex gap-2 w-[100px] items-center translate-x-20">
                                                        <div className="font-poppins font-extrabold text-7xl text-primary-main">03</div>
                                                        <div className="flex flex-col">
                                                            <div className="font-poppins font-bold text-2xl text-primary-main">{ranking[2].namaAlternatif}</div>
                                                            <div className="flex gap-2 font-poppins font-semibold text-base text-black">Score: <span className="text-primary-main">{ranking[2].total}</span></div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="w-full flex flex-col gap-2">
                                                    <div className="h-10 rounded-lg overflow-hidden">
                                                        <div className="h-full flex bg-white gap-2">
                                                            <div className="w-[20%] h-full flex justify-center items-center font-poppins font-semibold text-base text-white bg-primary-main">Rank</div>
                                                            <div className="w-[50%] h-full flex justify-center items-center font-poppins font-semibold text-base text-white bg-primary-main">Nama Alternatif</div>
                                                            <div className="w-[30%] h-full flex justify-center items-center font-poppins font-semibold text-base text-white bg-primary-main">Total Score</div>
                                                        </div>
                                                    </div>
                                                    <div className="rounded-lg border border-primary-surface overflow-hidden">
                                                        {
                                                            ranking.map((element, index) => (
                                                                <div className={`h-10 flex gap-2 bg-${index % 2 == 0 ? 'primary-surface' : 'white'}`} key={element.id}>
                                                                    <div className="w-[20%] h-full flex justify-center items-center font-poppins font-semibold text-base text-primary-main ">{index+1}</div>
                                                                    <div className="w-[50%] h-full flex justify-center items-center font-poppins font-semibold text-base text-primary-main ">{element.namaAlternatif}</div>
                                                                    <div className="w-[30%] h-full flex justify-center items-center font-poppins font-semibold text-base text-primary-main ">{element.total}</div>
                                                                </div>
                                                            ))
                                                        }
                                                    </div>
                                                    <div className="flex justify-center font-poppins font-semibold text-base">
                                                        Tabel 5. Tabel Ranking
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )
                                }
                            </div>
                        </div>
                        
                    </div>
                </div>
                
            </div>

            <div className="w-full flex justify-center items-center bg-white">
                <div className="w-full flex flex-col justify-center items-center py-5 gap-2 border-t-2 border-primary-surface">
                    <p className="flex font-poppins font-bold text-2xl">Match Your Vacation</p>
                    <div className="flex gap-3 items-center">
                        <p className="font-poppins font-semibold text-base text-primary-light">Faculty of Engineering</p>
                        <div className="w-1 h-1 rounded-full bg-primary-light" />
                        <p className="font-poppins font-semibold text-base text-primary-light">Yogyakarta State University</p>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default App;