const fs = require('fs');
const process = require('process');

const jsonPath = process.cwd() + '/moonshark-json'
const newCID = 'QmSjzQAJrLwhGPBpVrsb1nguJE2sFrMWALDrsczpRMWdeh'
const newImagePath = `https://moonsharks.mypinata.cloud/ipfs/${newCID}/`
const suffix = ".png"

main()

async function main(){

  let metadataJsonFiles = await fs.readdirSync(jsonPath)

  metadataJsonFiles.forEach((file) => {

    if(file === '_metadata.json'){
      let rawFile = fs.readFileSync(jsonPath + '/' + file)
      let alljsons = JSON.parse(rawFile)

      alljsons.forEach((i) => {
        let id = i.edition
        i.image = newImagePath + id + suffix
      })

      // Write new json to result folder
      let endData = JSON.stringify(alljsons);
      fs.writeFileSync(`./result/_metadata.json`, endData);

      return;
    }

    // Read JSON
    let rawFile = fs.readFileSync(jsonPath + '/' + file)
    let json = JSON.parse(rawFile)
    let id = json.edition


    // Updating Image CID Path
    json.image = newImagePath + id + suffix

    // create result folder if does not exist
    if (!fs.existsSync('./result')){
      fs.mkdirSync('./result');
    }

    // Write new json to result folder
    let endData = JSON.stringify(json);
    fs.writeFileSync(`./result/${id}.json`, endData);
  })

}
