import Repository from './repository.js'
import API from '../api.js'

class PodcastRepository extends Repository {

  constructor() {
    super()
    this.key = 'podcasts'
  }

  fetchAndSave() {
    return API.PodcastList().then((pods) => {
      return Promise.all(pods.map((i) => this.save(i)))
    })
  }

  all() {
    return super.all().then((items) => {
      if(items.length == 0) {
        return this.fetchAndSave().then(() => {
          return super.all()
        })
      } else {
        return items
      }
    }).catch(err => {
      console.warn(err);
    });
  }

}

export default new PodcastRepository()
