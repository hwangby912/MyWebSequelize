$().ready(function () {
    count=0;
    $('#member_insert_btn').click(function () {
        const name=$('#name').val();
        const user_id=$('#user_id').val();
        const comments=$('#comments').val();
        const send_params={
            name,
            user_id,
            comments
        };
        alert(JSON.stringify(user_id));
        $.post("/member_insert",send_params,function (data,status) {
            
            const parsed_data=JSON.parse(data);
            $('#result_div').html(`<h1>${parsed_data.msg}</h1>`);
        });     
    });

    $('#login_btn').click(function () {        
        const login_user_id=$('#login_user_id').val();        
        const send_params={           
            login_user_id
        };        
        $.post("/login",send_params,function (data,status) {            
           try{
               alert(JSON.parse(data).msg);  
               $('#login_user_id').val()="";   
           }catch(err){
               window.location.reload(true);
           }
            
        });        
    });

    $('#logout_btn').click(function () {                  
        $.get("/logout",function (data,status) {
            window.location.reload(true);
        });        
    });

    //carBasicInfoSearch_btn
    $('#carBasicInfoSearch_btn').click(function () {        
        const searchType=$('#searchType').val();    
        const car_num_input=$('#car_num_input').val();     
        const send_params={           
            searchType,
            car_num_input
        };        
        $.post("/search_carInfo",send_params,function (data,status) {
            
            if(status==='success'){
                const parsed_data=JSON.parse(data); 
                let printData=`<table border=1 style='background-color:white;text-align:center;font-weight: bold;width:300px;height:300px'>`;
                for(key in parsed_data.msg) {
                    if(key==='차량번호'){
                        printData += `<tr><td style='background-color:lightgray;'>${key}</td><td style='color:blue'><div id='car_no'>${parsed_data.msg[key]}</div></td></tr>`;
                    }else if(key==='용도 및 차종'){
                        printData += `<tr><td style='background-color:lightgray;'>${key}</td><td style='color:blue'><p contenteditable='true' id='useType'>${parsed_data.msg[key]}</p></td></tr>`;
                    }else{
                        printData += `<tr><td style='background-color:lightgray;'>${key}</td><td style='color:blue'>${parsed_data.msg[key]}</td></tr>`;
                    }
                }
                printData += `</table><button id='carBasicInfoUpdate_btn' class='btn btn-default' style='background-color:chartreuse;color:black;'>수정</button><br/><br/>`;         
                $('#carBasicInfoSearch_div').html(`${printData}`);
                
            }else{
                alert("조회 결과 없음");
                $('#carBasicInfoSearch_div').html("차량번호나 차대번호를 확인 하세요");
                
            }
        });        
    });

    $(document).on('click','#carBasicInfoUpdate_btn', function() {
        const car_no=$('#car_no').html(); 
        const useType=$('#useType').html(); 
        alert(car_no+":"+useType);
        const send_params={     
            car_no,      
            useType
        };     
        $.post("/update_carInfo",send_params,function (data,status) {
            
            if(status==='success'){                                
                $('#useType').attr('contenteditable','false');
                $('#useType').css('color','red');
            }else{                
                alert("차량정보를 확인하세요");
            }
        });
    });

    $('#member_delete_btn').click(function () {    
        if(confirm("정말 탈퇴하시겠습니까?") ){
            const user_id=$('#user_id').val();        
            const send_params={           
                user_id
            };        
            $.post("/member_delete",send_params,function (data,status) {            
                try{
                    alert(JSON.parse(data).msg);  
                    $('#user_id').val()="";   
                }catch(err){
                    window.location.reload(true);
                }                
            });      
        }else{
            $('#user_id').val()="";   
        }  
    });

    
});