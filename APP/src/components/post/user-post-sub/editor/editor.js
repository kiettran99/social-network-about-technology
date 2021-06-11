import { convertToRaw } from 'draft-js';
import axios from 'axios';
import urlAPI from '../../../../utils/urlAPI';

//********** Get Text from EditorState ***********//
const replaceStringAtIndex = (input, replaceValue, firstIndex, lastIndex) => {
    return input.substring(0, firstIndex) + replaceValue + input.substring(lastIndex);
}

const getTextFromEditorState = (editorState) => {
    const content = convertToRaw(editorState.getCurrentContent());

    const comment = Object.keys(content.blocks).reduce((comment, i) => {
        const { entityRanges, text } = content.blocks[i];

        const output = entityRanges.reverse().reduce((output, range, idx) => {
            const mention = content.entityMap[idx].data.mention;

            return replaceStringAtIndex(output, `<a class="text-primary" href="${mention.link}">${mention.name}</a>`,
                range.offset, range.offset + range.length);
        }, text);

        return (comment === '' ? comment : comment + '<br />') + output;
    }, '');

    return `<p>${comment}</p>`;
}

//********** Get Text from EditorState END ***********//

const getMentionByName = async (name) => {
    try {
        const res = await axios.get(`${urlAPI}/api/users/search?name=${name}`);

        return res.data.map(user => ({
            id: user._id,
            name: user.fullname,
            link: `/profile/${user._id}`,
            avatar: user.avatar
        }));
    }
    catch (e) {
        console.log(e);
        return [];
    }
}

const getHashTags = (inputText) => {  
    var regex = /(?:^|\s)(?:#)([a-zA-Z\d]+)/gm;
    var matches = [];
    var match;

    while ((match = regex.exec(inputText))) {
        matches.push(match[1]);
    }

    return matches;
}

const convertHashTagToArray = (editorState) => {

    if (typeof (editorState) === 'string') {
        return getHashTags(editorState);
    }

    const content = editorState.getCurrentContent().getPlainText();

    return getHashTags(content);
}

const editor = {
    getTextFromEditorState, getMentionByName, convertHashTagToArray,
    convertToRaw
};

export default editor;