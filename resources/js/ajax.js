/**
  Call ajax
  @param type:string GET, POST, PUT, ...
  @param url:string url
  @param headers:array/string header for the call ajax
  @param data:array/string body of the call ajax
  @param dataType: string dataType
  @return promise
*/
function ajax(type, url, headers, data, dataType){
  return new Promise((resolve, reject) => {
      $.ajax({
       type:type,
       url: url,
       headers: headers,
       data:data,
       dataType: dataType,
       contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
       success:function(data){
         resolve(data);
       },
       error:function(error){
         reject(error);
      }
    });
  });
}
