export default function findBlockType(blockTypes, type) {
    return blockTypes.find((blockType) => blockType.identifier === type);
}
