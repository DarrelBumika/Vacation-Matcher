import { Children } from "react";

export default function KriteriaInputForm({ children }, props) {
    return(
        <div className="w-auto flex gap-2">
            <div>
                {
                    Children.map(children, child => 
                        <div className="w-10 h-10 flex justify-center items-center bg-primary-main font-poppins font-semibold text-base text-white rounded-lg">{child}</div>
                    )
                }
            </div>
            <input type="text" className="w-[300px] h-10 p-2 rounded-lg border border-primary-main font-poppins font-normal" placeholder="Nama Kriteria" onChange={props.onChange}/>
            <input type="text" className="w-[200px] h-10 p-2 rounded-lg border border-primary-main font-poppins font-normal" placeholder="Nilai Kriteria" onChange={props.onChange}/>
            <select className="w-[100px] h-10 p-2 rounded-lg bg-primary-main font-poppins font-normal text-white cursor-pointer" onChange={props.onChange}>
                <option value="Cost">Cost</option>
                <option value="Benefit">Benefit</option>
            </select>
            <input type="text" className="w-[200px] h-10 p-2 rounded-lg border border-primary-main font-poppins font-normal" placeholder="Nilai Bobot" onChange={props.onChange}/>
            <button>Edit</button>
        </div>
    )
}