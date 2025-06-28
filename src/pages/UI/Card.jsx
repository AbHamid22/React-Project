function Card(props){
    return(
        <>
        <div className="card">            
            <div className="card-body">
               <h1 class="card-title">{props.title}</h1>
               {props.children}
            </div>         
        </div>         
        </>
    );
}

export default Card;