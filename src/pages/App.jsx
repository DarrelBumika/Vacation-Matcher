import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid"

function App() {

    // const tahap = ["Input Kriteria", "Input Alternatif", "Hasil Perhitungan"]
    const tahap= {
        "inputKriteria": {
            "title" : "Input Kriteria",
            "num"   : 1
        }, 
        "inputAlternatif": {
            "title" :"Input Alternatif",
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
                console.log(e.target)
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
                console.log(i)
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

    return(
        <div>
            <div className="flex justify-center items-center mt-10 mb-10 sticky">
                <div className="flex items-center gap-3">
                    <p className="flex font-poppins font-bold text-2xl">User's</p>
                    <p className="font-poppins font-extrabold text-6xl">Summer</p>
                    <p className="font-poppins font-bold text-2xl text-primary-main">vacation</p>
                </div>
            </div>

            <div className="flex justify-center">

                <div className="flex justify-center gap-20 border-t-[2px] border-primary-surface py-[50px]">
                    <div className="w-[300px] gap-5 h-fit flex flex-col sticky">
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

                    <div className="flex flex-col gap-10">

                        {/* Tahap 1 */}
                        <div className="flex flex-col gap-10" id={Object.keys(tahap)[0]}>

                            <div className="flex gap-10">
                                <div className="max-w-20 w-full h-20 flex justify-center items-center bg-primary-main rounded-3xl font-poppins font-bold text-white text-3xl">1</div>
                                <div className="flex flex-col gap-5">
                                    <div className="flex items-center font-poppins font-bold text-5xl">{Object.values(tahap)[0]["title"]}</div>
                                    <p className="flex font-poppins font-normal text-base text-justify max-w-[700px]">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veritatis recusandae vero officia atque perspiciatis mollitia sequi autem non nulla 
                                    adipisci, ipsam impedit et quidem, laboriosam praesentium architecto quasi excepturi blanditiis!</p>
                                </div>
                            </div>

                            <div className="w-auto h-full flex flex-col gap-5">
                                <div className="bg-primary-surface rounded-lg overflow-hidden">
                                    <div className="w-fit flex gap-2 mx-12 bg-white">
                                        <p className="w-[250px] h-10 flex items-center justify-center font-poppins bg-primary-surface font-semibold text-primary-main text-center">Nama Kriteria</p>
                                        <p className="w-[150px] h-10 flex items-center justify-center font-poppins bg-primary-surface font-semibold text-primary-main text-center">Kode Kriteria</p>
                                        <p className="w-[150px] h-10 flex items-center justify-center font-poppins bg-primary-surface font-semibold text-primary-main text-center">Cost/Benefit</p>
                                        <p className="w-[150px] h-10 flex items-center justify-center font-poppins bg-primary-surface font-semibold text-primary-main text-center">Nilai Bobot</p>
                                    </div>
                                </div>
                                <form className="flex flex-col gap-5">
                                    <div className="w-fit flex flex-col gap-5">
                                        {
                                            kriteriaInputFields.map(kriteriaInputField => (
                                                <div className="w-auto flex gap-2"  key={kriteriaInputField.id}>
                                                    <div className="w-10 h-10 flex gap-1 justify-center items-center">
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
                                                    <input type="text" name="namaKriteria" className="w-[250px] h-10 p-2 rounded-lg border border-primary-main font-poppins font-normal" defaultValue={kriteriaInputField.namaKriteria} placeholder="Nama Kriteria" onChange={e => handleChangeKriteriaFormFields(kriteriaInputField.id, e)} />
                                                    <input type="text" name="kodeKriteria" className="w-[150px] h-10 p-2 rounded-lg border border-primary-main font-poppins font-normal" defaultValue={kriteriaInputField.kodeKriteria} placeholder="Kode Kriteria" onChange={e => handleChangeKriteriaFormFields(kriteriaInputField.id, e)} />
                                                    <select name="costBenefit" className="w-[150px] h-10 p-2 rounded-lg bg-primary-main font-poppins font-normal text-white cursor-pointer" defaultValue={kriteriaInputField.costBenefit} onChange={e => handleChangeKriteriaFormFields(kriteriaInputField.id, e)} >
                                                        <option value="Cost">Cost</option>
                                                        <option value="Benefit">Benefit</option>
                                                    </select>
                                                    <input type="number" name="nilaiBobot" className="w-[150px] h-10 p-2 rounded-lg border border-primary-main font-poppins font-normal" defaultValue={kriteriaInputField.nilaiBobot} placeholder="Nilai Bobot" onChange={e => handleChangeKriteriaFormFields(kriteriaInputField.id, e)} />
                                                    <button className="w-10 h-10 flex gap-1 justify-center items-center rounded-lg bg-primary-main" onClick={() => kriteriaInputFields.length === 1 ? handleClearKriteriaFormFields() : handleRemoveKriteriaFormFields(kriteriaInputField.id)}>
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
                                <div className="w-20 h-20 flex justify-center items-center bg-primary-main rounded-3xl font-poppins font-bold text-white text-3xl">2</div>
                                <div className="flex flex-col gap-5">
                                    <div className="flex items-center font-poppins font-bold text-5xl">{Object.values(tahap)[1]["title"]}</div>
                                    <p className="font-poppins font-normal text-base text-justify max-w-[700px]">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veritatis recusandae vero officia atque perspiciatis mollitia sequi autem non nulla 
                                    adipisci, ipsam impedit et quidem, laboriosam praesentium architecto quasi excepturi blanditiis!</p>
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
                                <div className="w-20 h-20 flex justify-center items-center bg-primary-main rounded-3xl font-poppins font-bold text-white text-3xl">3</div>
                                <div className="flex flex-col gap-5">
                                    <div className="flex items-center font-poppins font-bold text-5xl">{Object.values(tahap)[2]["title"]}</div>
                                    <p className="font-poppins font-normal text-base text-justify max-w-[700px]">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veritatis recusandae vero officia atque perspiciatis mollitia sequi autem non nulla 
                                    adipisci, ipsam impedit et quidem, laboriosam praesentium architecto quasi excepturi blanditiis!</p>
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
                                            <div className="flex flex-col gap-5">
                                                <div className="pl-5 font-poppins font-semibold text-xl text-black">
                                                    {`${Object.values(Object.values(tahap)[2]["sub"])[0]["num"]}. ${Object.values(Object.values(tahap)[2]["sub"])[0]["title"]}`}
                                                </div>
                                                <div className="w-full flex flex-col gap-2">
                                                    <div className="h-10 rounded-lg overflow-hidden">
                                                        <div className="h-full flex bg-white gap-2">
                                                            <div className="w-10 h-full flex justify-center items-center font-poppins font-semibold text-base text-white bg-primary-main">No.</div>
                                                            <div className="w-[298px] h-full flex justify-center items-center font-poppins font-semibold text-base text-white bg-primary-main">Nama Kriteria</div>
                                                            <div className="w-[150px] h-full flex justify-center items-center font-poppins font-semibold text-base text-white bg-primary-main">Kode Kriteria</div>
                                                            <div className="w-[150px] h-full flex justify-center items-center font-poppins font-semibold text-base text-white bg-primary-main">Cost/Benefit</div>
                                                            <div className="w-[150px] h-full flex justify-center items-center font-poppins font-semibold text-base text-white bg-primary-main">Nilai Bobot</div>
                                                        </div>
                                                    </div>
                                                    <div className="rounded-lg border border-primary-surface overflow-hidden">
                                                        {
                                                            validKriteriaInputFields.map((element, index) => (
                                                                <div className={`h-10 flex gap-2 bg-${index % 2 == 0 ? 'primary-surface' : 'white'}`} key={element.id}>
                                                                    <div className="w-10 h-full flex justify-center items-center font-poppins font-semibold text-base text-primary-main ">{index+1}</div>
                                                                    <div className="w-[298px] h-full flex justify-center items-center font-poppins font-semibold text-base text-primary-main ">{element.namaKriteria}</div>
                                                                    <div className="w-[150px] h-full flex justify-center items-center font-poppins font-semibold text-base text-primary-main ">{element.kodeKriteria}</div>
                                                                    <div className="w-[150px] h-full flex justify-center items-center font-poppins font-semibold text-base text-primary-main ">{element.costBenefit}</div>
                                                                    <div className="w-[150px] h-full flex justify-center items-center font-poppins font-semibold text-base text-primary-main ">{element.nilaiBobot}</div>
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
                                                    <div className="flex flex-col gap-5">
                                                        <div className="w-full flex flex-col gap-2">
                                                            <div className="h-10 rounded-lg overflow-hidden">
                                                                <div className="h-full flex bg-white gap-2">
                                                                    <div className="w-10 h-full flex justify-center items-center font-poppins font-semibold text-base text-white bg-primary-main">No.</div>
                                                                    <div className="w-[298px] h-full flex justify-center items-center font-poppins font-semibold text-base text-white bg-primary-main">Nama Kriteria</div>
                                                                    <div className="w-[150px] h-full flex justify-center items-center font-poppins font-semibold text-base text-white bg-primary-main">Kode Kriteria</div>
                                                                    <div className="w-[150px] h-full flex justify-center items-center font-poppins font-semibold text-base text-white bg-primary-main">Cost/Benefit</div>
                                                                    <div className="w-[150px] h-full flex justify-center items-center font-poppins font-semibold text-base text-white bg-primary-main">Nilai Bobot</div>
                                                                </div>
                                                            </div>
                                                            <div className="rounded-lg border border-primary-surface overflow-hidden">
                                                                {
                                                                    validKriteriaInputFields.map((element, index) => (
                                                                        <div className={`h-10 flex gap-2 bg-${index % 2 == 0 ? 'primary-surface' : 'white'}`} key={element.id}>
                                                                            <div className="w-10 h-full flex justify-center items-center font-poppins font-semibold text-base text-primary-main ">{index+1}</div>
                                                                            <div className="w-[298px] h-full flex justify-center items-center font-poppins font-semibold text-base text-primary-main ">{element.namaKriteria}</div>
                                                                            <div className="w-[150px] h-full flex justify-center items-center font-poppins font-semibold text-base text-primary-main ">{element.kodeKriteria}</div>
                                                                            <div className="w-[150px] h-full flex justify-center items-center font-poppins font-semibold text-base text-primary-main ">{element.costBenefit}</div>
                                                                            <div className="w-[150px] h-full flex justify-center items-center font-poppins font-semibold text-base text-primary-main ">{element.nilaiBobot}</div>
                                                                        </div>
                                                                    ))
                                                                }
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
                                            <div className="flex flex-col gap-5">
                                                <div className="pl-5 font-poppins font-semibold text-xl text-black">
                                                    {`${Object.values(Object.values(tahap)[2]["sub"])[1]["num"]}. ${Object.values(Object.values(tahap)[2]["sub"])[1]["title"]}`}
                                                </div>
                                                <div className="w-full flex flex-col gap-2">
                                                    <div className="h-10 rounded-lg overflow-hidden">
                                                        <div className="h-full flex bg-white gap-2">
                                                            <div className="w-10 h-full flex justify-center items-center font-poppins font-semibold text-base text-white bg-primary-main">No.</div>
                                                            <div className="w-[298px] h-full flex justify-center items-center font-poppins font-semibold text-base text-white bg-primary-main">Nama Kriteria</div>
                                                            <div className="w-[150px] h-full flex justify-center items-center font-poppins font-semibold text-base text-white bg-primary-main">Kode Kriteria</div>
                                                            <div className="w-[150px] h-full flex justify-center items-center font-poppins font-semibold text-base text-white bg-primary-main">Cost/Benefit</div>
                                                            <div className="w-[150px] h-full flex justify-center items-center font-poppins font-semibold text-base text-white bg-primary-main">Nilai Bobot</div>
                                                        </div>
                                                    </div>
                                                    <div className="rounded-lg border border-primary-surface overflow-hidden">
                                                        {
                                                            validKriteriaInputFields.map((element, index) => (
                                                                <div className={`h-10 flex gap-2 bg-${index % 2 == 0 ? 'primary-surface' : 'white'}`} key={element.id}>
                                                                    <div className="w-10 h-full flex justify-center items-center font-poppins font-semibold text-base text-primary-main ">{index+1}</div>
                                                                    <div className="w-[298px] h-full flex justify-center items-center font-poppins font-semibold text-base text-primary-main ">{element.namaKriteria}</div>
                                                                    <div className="w-[150px] h-full flex justify-center items-center font-poppins font-semibold text-base text-primary-main ">{element.kodeKriteria}</div>
                                                                    <div className="w-[150px] h-full flex justify-center items-center font-poppins font-semibold text-base text-primary-main ">{element.costBenefit}</div>
                                                                    <div className="w-[150px] h-full flex justify-center items-center font-poppins font-semibold text-base text-primary-main ">{element.nilaiBobot}</div>
                                                                </div>
                                                            ))
                                                        }
                                                    </div>
                                                    <div className="flex justify-center font-poppins font-semibold text-base">
                                                        Tabel 1. Tabel Kriteria
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex flex-col gap-5">
                                                <div className="pl-5 font-poppins font-semibold text-xl text-black">
                                                    {`${Object.values(Object.values(tahap)[2]["sub"])[2]["num"]}. ${Object.values(Object.values(tahap)[2]["sub"])[2]["title"]}`}
                                                </div>
                                                <div className="w-full flex flex-col gap-2">
                                                    <div className="h-10 rounded-lg overflow-hidden">
                                                        <div className="h-full flex bg-white gap-2">
                                                            <div className="w-10 h-full flex justify-center items-center font-poppins font-semibold text-base text-white bg-primary-main">No.</div>
                                                            <div className="w-[298px] h-full flex justify-center items-center font-poppins font-semibold text-base text-white bg-primary-main">Nama Kriteria</div>
                                                            <div className="w-[150px] h-full flex justify-center items-center font-poppins font-semibold text-base text-white bg-primary-main">Kode Kriteria</div>
                                                            <div className="w-[150px] h-full flex justify-center items-center font-poppins font-semibold text-base text-white bg-primary-main">Cost/Benefit</div>
                                                            <div className="w-[150px] h-full flex justify-center items-center font-poppins font-semibold text-base text-white bg-primary-main">Nilai Bobot</div>
                                                        </div>
                                                    </div>
                                                    <div className="rounded-lg border border-primary-surface overflow-hidden">
                                                        {
                                                            validKriteriaInputFields.map((element, index) => (
                                                                <div className={`h-10 flex gap-2 bg-${index % 2 == 0 ? 'primary-surface' : 'white'}`} key={element.id}>
                                                                    <div className="w-10 h-full flex justify-center items-center font-poppins font-semibold text-base text-primary-main ">{index+1}</div>
                                                                    <div className="w-[298px] h-full flex justify-center items-center font-poppins font-semibold text-base text-primary-main ">{element.namaKriteria}</div>
                                                                    <div className="w-[150px] h-full flex justify-center items-center font-poppins font-semibold text-base text-primary-main ">{element.kodeKriteria}</div>
                                                                    <div className="w-[150px] h-full flex justify-center items-center font-poppins font-semibold text-base text-primary-main ">{element.costBenefit}</div>
                                                                    <div className="w-[150px] h-full flex justify-center items-center font-poppins font-semibold text-base text-primary-main ">{element.nilaiBobot}</div>
                                                                </div>
                                                            ))
                                                        }
                                                    </div>
                                                    <div className="flex justify-center font-poppins font-semibold text-base">
                                                        Tabel 1. Tabel Kriteria
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex flex-col gap-5">
                                                <div className="pl-5 font-poppins font-semibold text-xl text-black">
                                                    {`${Object.values(Object.values(tahap)[2]["sub"])[3]["num"]}. ${Object.values(Object.values(tahap)[2]["sub"])[3]["title"]}`}
                                                </div>
                                                <div className="w-full flex flex-col gap-2">
                                                    <div className="h-10 rounded-lg overflow-hidden">
                                                        <div className="h-full flex bg-white gap-2">
                                                            <div className="w-10 h-full flex justify-center items-center font-poppins font-semibold text-base text-white bg-primary-main">No.</div>
                                                            <div className="w-[298px] h-full flex justify-center items-center font-poppins font-semibold text-base text-white bg-primary-main">Nama Kriteria</div>
                                                            <div className="w-[150px] h-full flex justify-center items-center font-poppins font-semibold text-base text-white bg-primary-main">Kode Kriteria</div>
                                                            <div className="w-[150px] h-full flex justify-center items-center font-poppins font-semibold text-base text-white bg-primary-main">Cost/Benefit</div>
                                                            <div className="w-[150px] h-full flex justify-center items-center font-poppins font-semibold text-base text-white bg-primary-main">Nilai Bobot</div>
                                                        </div>
                                                    </div>
                                                    <div className="rounded-lg border border-primary-surface overflow-hidden">
                                                        {
                                                            validKriteriaInputFields.map((element, index) => (
                                                                <div className={`h-10 flex gap-2 bg-${index % 2 == 0 ? 'primary-surface' : 'white'}`} key={element.id}>
                                                                    <div className="w-10 h-full flex justify-center items-center font-poppins font-semibold text-base text-primary-main ">{index+1}</div>
                                                                    <div className="w-[298px] h-full flex justify-center items-center font-poppins font-semibold text-base text-primary-main ">{element.namaKriteria}</div>
                                                                    <div className="w-[150px] h-full flex justify-center items-center font-poppins font-semibold text-base text-primary-main ">{element.kodeKriteria}</div>
                                                                    <div className="w-[150px] h-full flex justify-center items-center font-poppins font-semibold text-base text-primary-main ">{element.costBenefit}</div>
                                                                    <div className="w-[150px] h-full flex justify-center items-center font-poppins font-semibold text-base text-primary-main ">{element.nilaiBobot}</div>
                                                                </div>
                                                            ))
                                                        }
                                                    </div>
                                                    <div className="flex justify-center font-poppins font-semibold text-base">
                                                        Tabel 1. Tabel Kriteria
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
        </div>
    )
}

export default App;