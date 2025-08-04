import React, { useMemo } from 'react';
import { useProcessMapStore } from '../useProcessMapStore';
import { Card, CardContent, CardFooter } from '../../../components/Card.jsx';
import { Button } from '../../../components/Button.jsx';

const Risk = ({ step, risk }) => {
  const { deleteRisk, maps, selectedMapId } = useProcessMapStore();

  const currentMap = maps.find(map => map.id === selectedMapId);
  const laborRate = currentMap?.laborRate || 25;

  const calculatedRiskCost = useMemo(() => {
    return (risk.timeImpact / 60) * laborRate + (risk.additionalCost || 0);
  }, [risk.timeImpact, risk.additionalCost, laborRate]);

  const handleDelete = () => {
    deleteRisk(step, risk.id);
  };

  return (
    <Card className="mt-2 bg-surface-light">
      <CardContent className="pt-4">
        <p><strong>Description:</strong> {risk.description}</p>
        <p><strong>Time Impact:</strong> {risk.timeImpact} minutes</p>
        <p><strong>Probability:</strong> {risk.probability}%</p>
        <p><strong>Additional Cost:</strong> ${risk.additionalCost?.toFixed(2)}</p>
        <p><strong>Calculated Risk Cost:</strong> ${calculatedRiskCost.toFixed(2)}</p>
      </CardContent>
      <CardFooter>
        <Button onClick={handleDelete} variant="destructive" size="sm">Delete Risk</Button>
      </CardFooter>
    </Card>
  );
};

export default Risk;
