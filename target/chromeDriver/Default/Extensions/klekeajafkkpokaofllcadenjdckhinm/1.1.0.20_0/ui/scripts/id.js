import extension from '../../common/mcafee_wb_webextension';

class IdDisplayer
{
  static showId()
  {
    extension.runtime.sendMessage({ action: 'GetId' }, (id) =>
    {
      if (undefined !== id)
      {
        const idelem = document.createTextNode(id);
        document.getElementById('uid').appendChild(idelem);
      }
    });
  }
}

IdDisplayer.showId();
