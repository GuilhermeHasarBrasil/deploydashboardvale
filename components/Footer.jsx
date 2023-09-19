export default function Footer() {
    return (
        <div style={{display:'flex', alignItems:'center', justifyContent:'center', height:50, width:'100%', backgroundColor:'#6D6262', position:'fixed', bottom:0}} >
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }} >
                <img src="/assets/logohasarmini.png" />
                <text style={{color:'white', fontWeight:'bold', marginLeft:5}} >Hasar Brasil, All rights reserved 2023</text>
            </div>
        </div>
    )
}