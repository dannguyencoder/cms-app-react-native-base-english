let  SYNC = {};
SYNC.user3 =(params)=>{

    if(params == null) return;
    // The name of the sync method must be exactly the same as the key of the stored data.
    // The argument accepted by the method is an entire object, and all parameters are deconstructed from the object.
    // Here you can use promise. Or use a normal callback function, but need to call resolve or reject.
      let { id, resolve, reject, syncParams: { extraFetchOptions, someFlag } } = params;
      fetch('user/', {
        method: 'GET',
        body: 'id=' + id,
        ...extraFetchOptions,
      }).then(response => {
        return response.json();
      }).then(json => {
        //console.log(json);
        if(json && json.user){
          storage.save({
            key: 'user',
            id,
            data: json.user
          });

          if (someFlag) {
            // Corresponding processing according to additional parameters in syncParams
          }

          // If successful, call resolve
          resolve && resolve(json.user);
        }
        else{
          // If it fails, call reject
          reject && reject(new Error('data parse error'));
        }
      }).catch(err => {
        console.warn(err);
        reject && reject(err);
      });
    }

export default SYNC
